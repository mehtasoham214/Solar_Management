const data = require("../data");
const projectData = data.project;
const customerData = data.customer;
const userData = data.user;
const materialData = data.materials;

const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const validator = require("../validator");

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "solar_manager_team21",
};

passport.use(
    new JWTStrategy(options, async (jwtPayload, done) => {
        try {
            const user = await userData.getUser(jwtPayload.username);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (e) {
            return done(e, false);
        }
    })
);

// Define storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/" + req.body.projectid);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000, // 1MB file size limit
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: Images Only!");
        }
    },
}).array("photos", 10);

router.post("/login", async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        // Get user from database
        const userinfo = await userData.getUser(username);
        // If user doesn't exist, return error response
        if (!userinfo) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        position = userinfo.position;
        // Compare provided password with hashed password from database
        const passwordMatches = await bcrypt.compare(
            password,
            userinfo.password
        );
        // If passwords don't match, return error response
        if (!passwordMatches) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Generate and sign JWT token
        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        // Return success response with JWT token
        //res.setHeader('Set-Cookie',`token=${token};HttpOnly`);
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ token, position });
    } catch (e) {
        res.status(404).json({ error: `Failed to : ${e}` });
    }
});

router.post("/logout", async (req, res) => {
    // Clear the user's session and remove the access token from local storage
    res.clearCookie("jwt");
    res.status(200).send({ message: "Logged out successfully" });
});

//Register User
router.post("/register", async (req, res, next) => {
    const username = req.body.username;
    const name = req.body.staffname;
    const password = req.body.password;
    const position = req.body.position;
    const contact = req.body.contact;

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in database
        const createdUserData = await userData.createUser(
            name,
            username,
            hashedPassword,
            position,
            contact
        );

        // Generate and sign JWT token
        const token = jwt.sign({ username }, process.env.JWT_SECRET);

        // Return success response with JWT token
        res.status(200).json({ createdUserData, token });
    } catch (e) {
        res.status(404).json({ error: `Failed to Register: ${e}` });
    }
});

//Getting all projects
router.get(
    "/projects",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1]; // get JWT token from Authorization header
            const projects = await projectData.getAllProjects(username);
            res.json(projects);
        } catch (e) {
            res.status(404).json({ error: `Failed to get projects: ${e}` });
        }
    }
);
router.get(
    "/userInfo",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1]; // get JWT token from Authorization header
            const userInformation = await userData.getUser(username);
            res.json(userInformation);
        } catch (e) {
            res.status(404).json({ error: `Failed to get projects: ${e}` });
        }
    }
);

//Creating Project
router.post(
    "/projects/add",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        const { username } = req.user;
        let customerName = req.body.customerName;
        let customerAddress = req.body.customerAddress;
        let customerNumber = req.body.customerNumber;
        let projectAddress = req.body.projectAddress;
        let date = req.body.date;

        try {
            validator.validateCustomerandProject(
                customerName,
                customerAddress,
                customerNumber,
                projectAddress
            );
        } catch (e) {
            res.status(400).json({
                error: `Invalid customer or project data: ${e}`,
            });
            return;
        }

        try {
            let data = {
                customerName,
                customerAddress,
                customerNumber,
                projectAddress,
                username,
                date,
            };
            const newProject = await projectData.createProject(data);
            res.status(200).json(newProject);
        } catch (e) {
            res.status(500).json({
                error: `Failed to create project: ${e}`,
            });
        }
    }
);

//Getting project by id
router.get(
    "/projects/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        const projectId = req.params.id;

        try {
            const project = await projectData.getProjectByid(projectId);
            res.json(project);
        } catch (e) {
            res.status(404).json({
                error: `Failed to get project with id ${projectId}: ${e}`,
            });
        }
    }
);

//Adding Site Inspector information
router.patch(
    "/projects/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        let id = req.params.id;
        let roofInfo = req.body.roofInfo;
        let backyard = req.body.backyard;
        let grid = req.body.grid;
        let meterCompatible = req.body.meterCompatible;
        let irradiance = req.body.irradiance;
        let feasible = req.body.feasible;

        try {
            validator.validateId(id);
            validator.validateAreaParameter(
                roofInfo,
                backyard,
                grid,
                meterCompatible
            );
        } catch (e) {
            res.status(404).json({ error: e });
            return;
        }

        try {
            const updateProject = await projectData.siteInspectorUpdate(
                id,
                roofInfo,
                backyard,
                grid,
                irradiance,
                meterCompatible,
                coordinates,
                photos,
                notes,
                feasible
            );
            res.status(200).json(updateProject);
        } catch (e) {
            res.status(404).json({ error: e });
        }
    }
);

//Adding Operation Engineer information
router.patch(
    "/projects/equipment/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        let id = req.params.id;
        let solarType,
            solarCount,
            wireType,
            wireCount,
            batteryType,
            batteryCount,
            railsType,
            railsCount,
            chargeControllerType,
            chargeControllerCount,
            inverterType,
            inverterCount,
            crewType,
            crewCount,
            oeFeasible,
            oeStatus;

        for (let i = 0; i < req.body.formData.length; i++) {
            let { type, count } = req.body.formData[i];
            switch (type) {
                case "solarType":
                    solarType = type;
                    solarCount = count;
                    break;
                case "wireType":
                    wireType = type;
                    wireCount = count;
                    break;
                case "batteryType":
                    batteryType = type;
                    batteryCount = count;
                    break;
                case "railsType":
                    railsType = type;
                    railsCount = count;
                    break;
                case "chargeControllerType":
                    chargeControllerType = type;
                    chargeControllerCount = count;
                    break;
                case "inverterType":
                    inverterType = type;
                    inverterCount = count;
                    break;
                case "crewType":
                    crewType = type;
                    crewCount = count;
                    break;
                case "oeFeasible":
                    oeFeasible = type;
                    oeStatus = count;
            }
        }

        try {
            const addEquipment = await projectData.addEquipment(
                id,
                solarType,
                solarCount,
                wireType,
                wireCount,
                batteryType,
                batteryCount,
                railsType,
                railsCount,
                chargeControllerType,
                chargeControllerCount,
                inverterType,
                inverterCount,
                crewType,
                crewCount,
                oeStatus
            );
            res.status(200).json(addEquipment);
        } catch (e) {
            res.status(404).json({ error: e });
        }
    }
);

//Adding Staff information to project
router.patch(
    "/projects/addStaff/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const projectId = req.params.id;
            const siteInspector = req.body.siteInspector;
            const operationEngineer = req.body.operationEngineer;
            const teamLead = req.body.teamLead;
            const updatedProject = await projectData.addStaff(
                projectId,
                siteInspector,
                operationEngineer,
                teamLead
            );
            res.json(updatedProject);
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
);

//Getting 5 inprogress projects
router.get(
    "/inprogress",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        const { username } = req.user;
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const inprogressProjects =
                await projectData.getInProgressFiveProjects(username);
            res.json(inprogressProjects);
        } catch (e) {
            res.status(404).json({ error: `Failed to get projects: ${e}` });
        }
    }
);

//Getting all inprogress projects
router.get(
    "/allinprogress",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const finishedProjects = await projectData.getOngoingProjects(
                username
            );
            res.json(finishedProjects);
        } catch (e) {
            res.status(404).json({ error: `Failed to get projects: ${e}` });
        }
    }
);

//Getting 5 finished projects
router.get(
    "/finished",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const finishedProjects = await projectData.getFinishedFiveProjects(
                username
            );
            res.json(finishedProjects);
        } catch (e) {
            res.status(404).json({ error: `Failed to get projects: ${e}` });
        }
    }
);

//Getting all finished projects
router.get(
    "/allfinished",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const finishedProjects = await projectData.getFinishedProjects(
                username
            );
            res.json(finishedProjects);
        } catch (e) {
            res.status(404).json({ error: `Failed to get projects: ${e}` });
        }
    }
);

// get customer by id
router.get(
    "/customer/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        const customerId = req.params.id;

        try {
            const customer = await customerData.getCustomerByid(customerId);
            res.json(customer);
        } catch (e) {
            res.status(404).json({
                error: `Failed to get customer with id ${customerId}: ${e}`,
            });
        }
    }
);

//Getting all leads
router.get(
    "/leads",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const leads = await customerData.getLeads(username);
            res.json(leads);
        } catch (e) {
            res.status(404).json({ error: `Failed to get leads: ${e}` });
        }
    }
);

// get all sales team
router.get(
    "/sales",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const salesTeam = await userData.getAllSalesTeam(username);
            res.json(salesTeam);
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

router.get(
    "/getsiteinspectors",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const siteInspectors = await userData.getAllSiteInspector();
            res.json(siteInspectors);
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

router.get(
    "/getoperationsengineer",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const operationsEngineers =
                await userData.getAllOperationsEngineer();
            res.json(operationsEngineers);
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

router.get(
    "/getteamlead",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const teamLeads = await userData.getAllTeamLeads();
            res.json(teamLeads);
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

router.get(
    "/getsalesteam",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const salesTeam = await userData.getAllSalesTeam();
            res.json(salesTeam);
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

router.patch(
    "/projects/equipment/update",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        let id = req.params.id;
        let solarType = req.body.solarType;
        let solarCount = req.body.solarCount;
        let wireType = req.body.wireType;
        let wireCount = req.body.wireCount;
        let batteryCount = req.body.batteryCount;
        let batteryCapacity = req.body.batteryCapacity;
        let railsCount = req.body.railsCount;
        let chargeControllertype = req.body.chargeControllertype;
        let chargeControllerCount = req.body.chargeControllerCount;
        let inverterType = req.body.inverterType;
        let inverterCount = req.body.inverterCount;
        let crewCount = req.body.crewCount;

        try {
            const addEquipment = await projectData.addEquipment(
                id,
                solarType,
                solarCount,
                wireType,
                wireCount,
                batteryCount,
                batteryCapacity,
                railsCount,
                chargeControllertype,
                chargeControllerCount,
                inverterType,
                inverterCount,
                crewCount
            );
            res.status(200).json(addEquipment);
        } catch (e) {
            res.status(404).json({ error: e });
        }
    }
);
router.get("/image/:projectid/:imagename", (req, res) => {
    const { projectid, imagename } = req.params;
    const path = __dirname + "/../public/images/" + projectid + "/" + imagename;
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.status(404).send("Image not found!");
        } else {
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.end(data);
        }
    });
});

router.post("/submit/:projectid/:imagename", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            // Save form data to database
            const photos = req.files.map((file) => {
                return "/images/" + req.body.projectid + "/" + file.filename;
            });
            // ... save the form data and photo paths to database
            res.status(200).send("Form submitted successfully!");
        }
    });
});

// Get Ongoing Counts
router.get(
    "/ongoingcount",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const ongoingCounts = await projectData.getOngoingCount(username);
            res.json({ counts: ongoingCounts });
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

// Get Past Counts
router.get(
    "/pastcount",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const finishedCount = await projectData.getFinishedCount(username);
            res.json({ counts: finishedCount });
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

router.get(
    "/gettotalCost",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const totalSales = await projectData.getCost(username);
            res.json({ cost: totalSales });
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

router.get(
    "/customers",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const customers = await customerData.getCustomers(username);
            res.json(customers);
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

router.get(
    "/userinfo",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const user = await userData.getUser(username);
            res.json(user);
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

// Update Project Status
router.patch(
    "/projectstatus",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const type = req.body.type;
            const projectId = req.body.id;
            if (type == "Edit") {
            } else if (type == "Finish") {
                const project = await projectData.buttonClick(projectId, type);
                res.json(project);
            } else if (type == "Cancel") {
                const project = await projectData.buttonClick(projectId, type);
                res.json(project);
            } else if (type == "Start") {
                const project = await projectData.buttonClick(projectId, type);
                res.json(project);
            }
        } catch (e) {
            res.status(404).json({ error: `Failed to get leads: ${e}` });
        }
    }
);

router.get(
    "/materials",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const materials = await materialData.getMaterials(username);
            res.json(materials);
        } catch (e) {
            res.status(404).json({ error: `Failed to get materials: ${e}` });
        }
    }
);

// REMOVE THESE INTO A NEW ROUTER FILE
router.get(
    "/notes",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const materials = await projectData.getNotes();
            res.json(materials);
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

// ROUTE TO POST A NOTE
router.post(
    "/postnotes",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const incomingNote = req.body.incomingNote;
            const projectid = req.body.projectid;
            const materials = await projectData.postNotes(
                incomingNote,
                projectid,
                username
            );
            res.json(materials);
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

// patch project
router.patch(
    "/customer_patch",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        let data = req.body;
        let projectId = data.projectId;
        let customerName = data.customerName;
        let customerAddress = data.customerAddress;
        let projectAddress = data.projectAddress;
        let customerNumber = data.customerNumber;
        let appointmentDate = data.date;

        try {
            const updateProject = await projectData.patchProject(
                projectId,
                customerName,
                customerAddress,
                projectAddress,
                customerNumber,
                appointmentDate
            );
            res.status(200).json(updateProject);
        } catch (e) {
            res.status(400).json({ error: e });
        }
    }
);

//Generating Invoice
router.get(
    "/generateInvoice/:projectid",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const projectid = req.params.projectid;

            const generatedInvoice = await projectData.generateInvoice(
                projectid
            );
            res.status(200).json(generatedInvoice);
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

module.exports = router;
