// Add code for create project POST -- Done
// Add code for fetch top 5 projects GET -- Done
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
const leads = mongoCollections.leads;
const notes = mongoCollections.notes;
const material = mongoCollections.material;
const { ObjectId } = require("mongodb");
const validator = require("../validator");

// Create a new project and customer
const createProject = async (data) => {
    let customerName = data.customerName.trim();
    let customerAddress = data.customerAddress.trim();
    let customerNumber = data.customerNumber.trim();
    let projectAddress = data.projectAddress.trim();
    let siteInspector = undefined;
    let startDate = new Date().toLocaleDateString();
    let appointmentDate = data.appointmentDate;
    let endDate = undefined;
    let areaInfo = [];
    let images = [];
    let equipment = [];
    let totalCost = undefined;
    let projectStatus = "Pending";
    let addedNotes = undefined;
    let whoAdded = undefined;
    let addedDate = undefined;
    validator.validateCustomerandProject(
        customerName,
        customerAddress,
        customerNumber,
        projectAddress
    );
    customerNumber = parseInt(customerNumber);

    // Insert customer information into the customers collection
    if (!appointmentDate) {
        const leadsCollection = await leads();
        const leadsInfo = {
            customerName: customerName,
            customerNumber: customerNumber,
            Date: new Date().toLocaleDateString(),
        };
        const newLeadsInfo = await leadsCollection.insertOne(leadsInfo);
        if (newLeadsInfo.insertedCount == 0) {
            throw `Error In Creating Lead`;
        } else {
            return "Created Lead";
        }
    } else {
        const customerCollection = await customer();
        const customerInfo = {
            customerName: customerName,
            customerAddress: customerAddress,
            customerNumber: customerNumber,
        };
        const newCustInfo = await customerCollection.insertOne(customerInfo);
        const customerId = newCustInfo.insertedId;

        // Insert project information into the projects collection
        const projectCollection = await project();
        let projectdata = {
            customerId: customerId,
            customerName: customerName,
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
        const newInfo = await projectCollection.insertOne(projectdata);
        const projectId = newInfo.insertedId;
        let notesData = {
            projectId: projectId,
            notes: addedNotes,
            whoAdded: whoAdded,
            addedDate: addedDate,
        };
        const notesCollection = await notes();
        const newNotesInfo = await notesCollection.insertOne(notesData);

        if (
            newInfo.insertedCount == 0 ||
            newCustInfo.insertedCount == 0 ||
            newNotesInfo.insertedCount == 0
        ) {
            throw `Error In Creating Project`;
        } else {
            return "Created Project";
        }
    }
};

// To get allprojects
const getAllProjects = async () => {
    const projectCollection = await project();
    let allProjects = await projectCollection.find({}).toArray();

    inProgressProjects = await projectCollection.find({
        projectStatus: "In-Progress",
        projectStatus: "Pending",
    });
    finishedProjects = await projectCollection.find({
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
        .find({ projectStatus: { $in: ["In-Progress", "Pending"] } })
        .limit(5)
        .toArray();

    if (inProgressProjects.length == 0) {
        throw `No Projects Found`;
    }
    return inProgressProjects;
};

// To get all ongoing projects
const getOngoingProjects = async () => {
    const projectCollection = await project();
    let finishedProjects = await projectCollection
        .find({ projectStatus: { $in: ["In-Progress", "Pending"] } })
        .toArray();
    if (finishedProjects.length == 0) {
        throw `No Projects Found`;
    }
    return finishedProjects;
};

// To get finished five projects
const getFinishedFiveProjects = async () => {
    const projectCollection = await project();
    let finishedProjects = await projectCollection
        .find({ projectStatus: { $in: ["Cancelled", "Finished"] } })
        .limit(5)
        .toArray();

    if (finishedProjects.length == 0) {
        throw `No Projects Found`;
    }
    return finishedProjects;
};

// To get all finished projects
const getFinishedProjects = async () => {
    const projectCollection = await project();
    let finishedProjects = await projectCollection
        .find({ projectStatus: { $in: ["Cancelled", "Finished"] } })
        .toArray();
    if (finishedProjects.length == 0) {
        throw `No Projects Found`;
    }
    return finishedProjects;
};

// To get project by id
const getProjectByid = async (id) => {
    validator.validateId(id);
    if (typeof id == "string") {
        id = new ObjectId(id);
    }
    const projectCollection = await project();
    const projectinfo = await projectCollection.findOne({ _id: id });
    if (!projectinfo) {
        throw `No Project Found`;
    }
    return projectinfo;
};

//Update project stats by button click
const buttonClick = async (id, type) => {
    const projectCollection = await project();
    const projectStatus = await getProjectByid(id);

    if (type == "start") {
        projectStatus.status = "In-Progress";
        progress = "With Boots on Ground";
        let startDate = new Date().toLocaleDateString();
        await projectCollection().updateOne(
            { _id: id },
            {
                $set: {
                    status: projectStatus.status,
                    startDate: startDate,
                    progress: progress,
                },
            }
        );
    }
    if (type == "finished") {
        projectStatus.status = "Finished";
        let endDate = new Date().toLocaleDateString();
        let progress = "Completed";
        await projectCollection().updateOne(
            { _id: id },
            {
                $set: {
                    status: projectStatus.status,
                    endDate: endDate,
                    progress: progress,
                },
            }
        );
    }
    if (type == "cancelled") {
        projectStatus.status = "Cancelled";
        let endDate = new Date().toLocaleDateString();
        let progress = "Cancelled";
        await projectCollection().updateOne(
            { _id: id },
            {
                $set: {
                    status: projectStatus.status,
                    endDate: endDate,
                    progress: progress,
                },
            }
        );
    }
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
    irradiance,
    meterCompatible,
    coordinates,
    photos,
    notes,
    feasible
) => {
    validator.validateId(id);
    validator.validateAreaParameter(roofInfo, backyard, grid, meterCompatible);
    const project = await projectCollection.findOne({ _id: id });
    const siteInspector = {
        roofInfo: roofInfo,
        backyard: backyard,
        grid: grid,
        irradiance: irradiance,
        meterCompatible: meterCompatible,
        coordinates: coordinates,
        notes: notes,
        feasible: feasible,
    };
    let progressStatus = "At Operations Engineer";
    const pictures = {
        photos: photos,
    };
    await project().updateOne(
        { _id: id },
        {
            $set: {
                areaInfo: siteInspector,
                images: pictures,
                progress: progressStatus,
            },
        }
    );
    if (updatedInfo.modifiedCount == 0) {
        throw `Couldn't update Site Inspector Information`;
    } else {
        return "Site Inspector information updated";
    }
};
//For Operations Engineer
const addStaff = async (id, siteInspector, operationsEngineer, teamLead) => {
    const projectCollection = await project();
    const project = await projectCollection.findOne({ _id: id });
    let progressStatus = "With Site Inspector";
    await project().update(
        { _id: id },
        {
            $set: {
                siteInspector: siteInspector,
                operationsEngineer: operationsEngineer,
                teamLead: teamLead,
                progress: progressStatus,
            },
        }
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
    railsCount,
    chargeControllertype,
    chargeControllerCount
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
        chargeControllertype: chargeControllertype,
        chargeControllerCount: chargeControllerCount,
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
    buttonClick,
    siteInspectorUpdate,
    addStaff,
    addEquipment,
    getFinishedProjects,
    getOngoingProjects,
};
