const data = require("../data");
const projectData = data.project;
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

// changeroute
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

module.exports = router;
