const data = require("../data");
const projectData = data.project;
const customerData = data.customer;
const userData = data.user;

const express = require("express");
const router = express.Router();
const validator = require("../validator");

router.get("/projects", async (req, res) => {
    try {
        const projects = await projectData.getAllProjects();
        res.json(projects);
    } catch (e) {
        res.status(404).json({ error: `Failed to get projects: ${e}` });
    }
});

router.post("/projects/add", async (req, res) => {
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
        };
        const newProject = await projectData.createProject(data);
        res.status(200).json(newProject);
    } catch (e) {
        res.status(500).json({
            error: `Failed to create project: ${e}`,
        });
    }
});

router.get("/projects/:id", async (req, res) => {
    const projectId = req.params.id;

    try {
        const project = await projectData.getProjectByid(projectId);
        res.json(project);
    } catch (e) {
        res.status(404).json({
            error: `Failed to get project with id ${projectId}: ${e}`,
        });
    }
});

router.patch("/projects/:id", async (req, res) => {
    let id = req.params.id;
    let roofInfo = req.body.roofInfo;
    let backyard = req.body.backyard;
    let grid = req.body.grid;
    let meterCompatible = req.body.meterCompatible;
    let coordinates = req.body.coordinates;

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
            meterCompatible,
            coordinates
        );
        res.status(200).json(updateProject);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.patch("/projects/equipment/:id", async (req, res) => {
    let id = req.params.id;
    let solarType = req.body.solarType;
    let solarCount = req.body.solarCount;
    let wireType = req.body.wireType;
    let wireCount = req.body.wireCount;
    let batteryCount = req.body.batteryCount;
    let batteryCapacity = req.body.batteryCapacity;
    let railsCount = req.body.railsCount;
    try {
        const addEquipment = await projectData.addEquipment(
            id,
            solarType,
            solarCount,
            wireType,
            wireCount,
            batteryCount,
            batteryCapacity,
            railsCount
        );
        res.status(200).json(addEquipment);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.patch("/projects/siteinspector/:id", async (req, res) => {
    try {
        const projectId = req.params.id;
        const siteInspector = req.body.siteInspector;

        if (!siteInspector) {
            throw new Error("siteInspector data is missing");
        }

        const updatedProject = await projectData.updateSiteInspector(
            projectId,
            siteInspector
        );
        res.json(updatedProject);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get("/inprogress", async (req, res) => {
    try {
        const inprogressProjects =
            await projectData.getInProgressFiveProjects();
        res.json(inprogressProjects);
    } catch (e) {
        res.status(404).json({ error: `Failed to get projects: ${e}` });
    }
});

router.get("/allinprogress", async (req, res) => {
    try {
        const finishedProjects = await projectData.getOngoingProjects();
        res.json(finishedProjects);
    } catch (e) {
        res.status(404).json({ error: `Failed to get projects: ${e}` });
    }
});

router.get("/finished", async (req, res) => {
    try {
        const finishedProjects = await projectData.getFinishedFiveProjects();
        res.json(finishedProjects);
    } catch (e) {
        res.status(404).json({ error: `Failed to get projects: ${e}` });
    }
});

router.get("/allfinished", async (req, res) => {
    try {
        const finishedProjects = await projectData.getFinishedProjects();
        res.json(finishedProjects);
    } catch (e) {
        res.status(404).json({ error: `Failed to get projects: ${e}` });
    }
});

// get customer
router.get("/customer/:id", async (req, res) => {
    const customerId = req.params.id;

    try {
        const customer = await customerData.getCustomerByid(customerId);
        res.json(customer);
    } catch (e) {
        res.status(404).json({
            error: `Failed to get customer with id ${customerId}: ${e}`,
        });
    }
});

// patch customer
router.patch("/customer_patch", async (req, res) => {
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
});

// get all sales team
router.get("/sales", async (req, res) => {
    try {
        const salesTeam = await userData.getAllSalesTeam();
        res.json(salesTeam);
    } catch (e) {
        res.status(404).json({ error: `Failed to get users: ${e}` });
    }
});


router.get("/siteinspectors", async (req, res) => {
    try {
        const siteInspectors= await userData.getAllSiteInspector();
        res.json(siteInspectors);
    } catch (e) {
        res.status(404).json({ error: `Failed to get users: ${e}` });
    }
});

router.get("/operationsengineer", async (req, res) => {
    try {
        const operationsEgineers= await userData.getAllOperationsEngineer();
        res.json(operationsEgineers);
    } catch (e) {
        res.status(404).json({ error: `Failed to get users: ${e}` });
    }
});

router.get("/teamlead", async (req, res) => {
    try {
        const teamLeads= await userData.getAllTeamLeads();
        res.json(teamLeads);
    } catch (e) {
        res.status(404).json({ error: `Failed to get users: ${e}` });
    }
});
module.exports = router;
