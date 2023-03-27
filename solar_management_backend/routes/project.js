const data = require("../data");
const projectData = data.project;
const customerData = data.customer;
const userData = data.user;

const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const validator = require("../validator");

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    try {
        // Get user from database
        const user = await getUser(username);
        // If user doesn't exist, return error response
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Compare provided password with hashed password from database
        const passwordMatches = await bcrypt.compare(password, user.password);
        // If passwords don't match, return error response
        if (!passwordMatches) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Generate and sign JWT token
        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        // Return success response with JWT token
        res.json({ token });
    } catch (error) {
        next(error);
    }
});

//Getting all projects
router.get(
    "/projects",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const projects = await projectData.getAllProjects();
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
                chargeControllerCount
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
            const finishedProjects = await projectData.getOngoingProjects();
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
            const finishedProjects =
                await projectData.getFinishedFiveProjects();
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
            const finishedProjects = await projectData.getFinishedProjects();
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
            const leads = await customerData.getLeads();
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
            const salesTeam = await userData.getAllSalesTeam();
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
            const siteInspectors = await userData.getAllSiteInspector();
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
            const operationsEgineers =
                await userData.getAllOperationsEngineer();
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
            const teamLeads = await userData.getAllTeamLeads();
            res.json(teamLeads);
        } catch (e) {
            res.status(404).json({ error: `Failed to get users: ${e}` });
        }
    }
);

module.exports = router;
