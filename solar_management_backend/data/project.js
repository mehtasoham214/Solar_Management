// Add code for create project POST -- Done
// Add code for fetch top 5 projects GET
// Add code to fetch all projects ( and covert in to 2 arrays) GET --Done
// Add code to fetch single selected project GET -- Done
// Add code to update project information PATCH -- Done
// Add field validation -- Done

// Types of update:
// 1. Button to start, end, cancel -- Done
// 2. add information from site inspector (project parameters) -- Done
// 3. add information from opereations engineer (equipment, name of site inspector)

const mongoCollections = require("../db/collection");
const project = mongoCollections.project;
const customer = mongoCollections.customer;
const { ObjectId } = require("mongodb");
const validator = require("../validator");

// Create a new project and customer
const createProject = async (data) => {
    let projectId = data.projectId.trim();
    let customerName = data.customerName.trim();
    let customerAddress = data.customerAddress.trim();
    let customerNumber = data.customerNumber.trim();
    let projectAddress = data.projectAddress.trim();
    let siteInspector = undefined;
    let startDate = undefined;
    let endDate = undefined;
    let areaInfo = [];
    let images = [];
    let equipment = [];
    let totalCost = undefined;
    let projectStatus = "Pending";
    validateCustomerandProject(
        projectId,
        customerName,
        customerAddress,
        customerNumber,
        projectAddress
    );
    customerNumber = parseInt(customerNumber);
    let projectInfo = {
        projectId: projectId,
        projectAddress: projectAddress,
    };
    let customerInfo = {
        customerName: customerName,
        customerAddress: customerAddress,
        customerNumber: customerNumber,
        projectInfo: projectInfo,
    };
    let project = {
        projectId: projectId,
        projectAddress: projectAddress,
        projectStatus: projectStatus,
        siteInspector: siteInspector,
        startDate: startDate,
        endDate: endDate,
        areaInfo: areaInfo,
        images: images,
        equipment: equipment,
        totalCost: totalCost,
    };
    const projectCollection = await project();
    const customerCollection = await customer();
    const newInfo = await projectCollection.insertOne({ project });
    const newCustInfo = await customerCollection.insertOne({ customerInfo });

    if (newInfo.insertedCount == 0 || newCustInfo.insertedCount == 0) {
        throw "Error In Creating Project";
    } else {
        return "Created Project";
    }
};

// To get allprojects
const getAllProjects = async () => {
    const projectCollection = await project();
    let allProjects = await projectCollection;
    inProgressProjects = await allProjects.find({
        projectStatus: "In-Progress",
        projectStatus: "Pending",
    });
    finishedProjects = await allProjects.find({
        projectStatus: "Finished",
        projectStatus: "Cancelled",
    });

    if (allProjects.length == 0) {
        throw `No Projects Found`;
    }
    return allProjects;
};

// To get in-progress five projects
const getInProgressFiveProjects = async () => {
    const projectCollection = await project();
    let inProgressProjects = await projectCollection
        .find({ projectStatus: "In-Progress" })
        .limit(5);

    if (inProgressProjects.length == 0) {
        throw `No Projects Found`;
    }
    return inProgressProjects;
};

// To get finished five projects
const getFinishedFiveProjects = async () => {
    const projectCollection = await project();
    let finishedProjects = await projectCollection
        .find({ projectStatus: "Finished" })
        .limit(5);

    if (finshedProjects.length == 0) {
        throw `No Projects Found`;
    }
    return finishedProjects;
};

const getProjectByid = async (id) => {
    validator.validateId(id);
    const projectCollection = await project();
    if (typeof id == "string") {
        id = new ObjectId(id);
    }
    const project = await projectCollection.findOne({ _id: id });
    if (!project) {
        throw `No Project Found`;
    }
    return project;
};

const getProject = async (projectId) => {
    const projectCollection = await project();
    const project = await projectCollection.findOne({ projectId: projectId });

    if (!project) {
        throw `Project Not Found`;
    }
    return project;
};

const buttonClick = async (id, type) => {
    const projectCollection = await project();
    const projectStatus = await getProjectByid(id);
    if (type == "end") {
        projectStatus.status = "Finished";
    }
    if (type == "cancel") {
        projectStatus.status = "Cancelled";
    }
    await projectCollection().updateOne(
        { _id: id },
        { $set: { status: projectStatus.status } }
    );
    if (updatedInfo.modifiedCount == 0) {
        throw `Couldn't update Status of Project`;
    } else {
        return "Project Status : " + projectStatus.status;
    }
};

//For site Inspector
const siteInspectorUpdate = async (
    id,
    roofInfo,
    backyard,
    grid,
    meterCompatible,
    coordinates
) => {
    validator.validateId(id);
    validator.validateAreaParameter(roofInfo, backyard, grid, meterCompatible);
    const project = await projectCollection.findOne({ _id: id });
    const siteInspector = {
        roofInfo: roofInfo,
        backyard: backyard,
        grid: grid,
        meterCompatible: meterCompatible,
        coordinates: coordinates,
    };
    await project().updateOne(
        { _id: id },
        { $set: { areaInfo: siteInspector } }
    );
    if (updatedInfo.modifiedCount == 0) {
        throw `Couldn't update Site Inspector Information`;
    } else {
        return "Site Inspector information updated";
    }
};

//For Operations Engineer
const addSiteInspector = async (id, siteInspector) => {
    const projectCollection = await project();
    const project = await projectCollection.findOne({ _id: id });
    await project().update(
        { _id: id },
        { $set: { siteInspector: siteInspector, status: "In-Progress" } }
    );
    if (updatedInfo.modifiedCount == 0) {
        throw `Couldn't add Site Inspector`;
    } else {
        return "Site Inspector added";
    }
};

//For operations Engineer
const addEquipment = async (
    id,
    solarType,
    solarCount,
    wireType,
    wireCount,
    batteryCount,
    batteryCapacity,
    railsCount
) => {
    const projectCollection = await project();
    const project = await projectCollection.findOne({ _id: id });
    const equipment = {
        solarType: solarType,
        solarCount: solarCount,
        wireType: wireType,
        wireCount: wireCount,
        batteryCount: batteryCount,
        batteryCapacity: batteryCapacity,
        railsCount: railsCount,
    };
    await project().updateOne({ _id: id }, { $set: { equipment: equipment } });
    if (updatedInfo.modifiedCount == 0) {
        throw `Couldn't add Equipment`;
    } else {
        return "Equipment added to Project";
    }
};

module.exports = {
    createProject,
    getAllProjects,
    getInProgressFiveProjects,
    getFinishedFiveProjects,
    getProjectByid,
    getProject,
    buttonClick,
    siteInspectorUpdate,
    addSiteInspector,
    addEquipment,
    getAllProjects,
    getInProgressFiveProjects,
    getFinishedFiveProjects,
};
