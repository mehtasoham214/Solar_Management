const data = require("../data");
const projectData = data.project;
const customerData = data.customer;
const userData = data.user;

const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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

            if (!siteInspector) {
                throw new Error("siteInspector data is missing");
            }

            const updatedProject = await projectData.updateSiteInspector(
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

// patch customer
router.patch(
    "/customer_patch",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        let customerId = req.body.customerId;
        let customerName = req.body.customerName;
        let customerAddress = req.body.customerAddress;
        let customerNumber = req.body.customerNumber;

        try {
            validator.validateId(customerId);
            validator.validateCustomer(
                customerName,
                customerAddress,
                customerNumber
            );
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }

        try {
            const updateCustomer = await customerData.patchCustomer(
                customerId,
                customerName,
                customerAddress,
                customerNumber
            );
            res.status(200).json(updateCustomer);
        } catch (e) {
            res.status(400).json({ error: e });
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
    "/siteinspectors",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const siteInspectors = await userData.getAllSiteInspector(username);
            res.json(siteInspectors);
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

router.get(
    "/operationsengineer",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const operationsEgineers = await userData.getAllOperationsEngineer(
                username
            );
            res.json(operationsEgineers);
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

router.get(
    "/teamlead",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const { username } = req.user;
            const token = req.headers.authorization.split(" ")[1];
            const teamLeads = await userData.getAllTeamLeads(username);
            res.json(teamLeads);
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

module.exports = router;
