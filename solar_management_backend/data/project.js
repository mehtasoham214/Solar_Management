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
const requests = mongoCollections.requests;
const { ObjectId } = require("mongodb");
const validator = require("../validator");
const user = require("./user");

// Create a new project and customer
const createProject = async (data) => {
    let customerName = data.customerName.trim();
    let customerAddress = data.customerAddress.trim();
    let customerNumber = data.customerNumber.trim();
    let projectAddress = data.projectAddress.trim();
    let sales = data.username;
    let siteInspector = "Not Assigned";
    let operationEngineer = "Not Assigned";
    let teamLead = "Not Assigned";
    let startDate = new Date().toLocaleDateString();
    let appointmentDate = data.date;
    let projectProgress = "With Operations Manager";
    let endDate = "Not Assigned";
    let areaInfo = [];
    let images = [];
    let equipment = [];
    let totalCost = "Not Assigned";
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
            salesIncharge: sales,
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
            salesIncharge: sales,
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
            projectProgress: projectProgress,
            salesIncharge: sales,
            siteInspector: siteInspector,
            operationEngineer: operationEngineer,
            teamLead: teamLead,
            appointmentDate: appointmentDate,
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
const getAllProjects = async (username) => {
    let staffUser = await user.getUser(username);
    let allProjects = undefined;
    if (staffUser.position == "Sales Team") {
        const projectCollection = await project();
        allProjects = await projectCollection
            .find({ salesIncharge: username })
            .toArray();

        let inProgressProjects = await projectCollection.find({
            projectStatus: "In-Progress",
            projectStatus: "Pending",
            salesIncharge: username,
        });
        let finishedProjects = await projectCollection.find({
            projectStatus: "Finished",
            projectStatus: "Cancelled",
            salesIncharge: username,
        });
    }
    if (staffUser.position == "Operations Manager") {
        const projectCollection = await project();
        allProjects = await projectCollection.find({}).toArray();

        let inProgressProjects = await projectCollection.find({
            projectStatus: "In-Progress",
            projectStatus: "Pending",
        });
        let finishedProjects = await projectCollection.find({
            projectStatus: "Finished",
            projectStatus: "Cancelled",
        });
    }
    if (allProjects.length == 0) {
        throw `No Projects Found`;
    }
    return allProjects;
};

// To get in-progress five projects
const getInProgressFiveProjects = async (username) => {
    const projectCollection = await project();
    let staffUser = await user.getUser(username);
    let inProgressProjects = undefined;
    if (staffUser.position == "Sales Team") {
        inProgressProjects = await projectCollection
            .find({
                projectStatus: { $in: ["In-Progress", "Pending"] },
                salesIncharge: username,
            })
            .limit(5)
            .toArray();
    } else {
        inProgressProjects = await projectCollection
            .find({
                projectStatus: { $in: ["In-Progress", "Pending"] },
            })
            .limit(5)
            .toArray();
    }
    if (inProgressProjects.length == 0) {
        throw `No Projects Found`;
    }
    return inProgressProjects;
};

// To get all ongoing projects
const getOngoingProjects = async (username) => {
    const projectCollection = await project();

    let staffUser = await user.getUser(username);
    let onGoingProjects = undefined;
    if (staffUser.position == "Sales Team") {
        onGoingProjects = await projectCollection
            .find({
                projectStatus: { $in: ["In-Progress", "Pending"] },
                salesIncharge: username,
            })
            .toArray();
    } else {
        onGoingProjects = await projectCollection
            .find({
                projectStatus: { $in: ["In-Progress", "Pending"] },
            })
            .toArray();
    }
    if (onGoingProjects.length == 0) {
        throw `No Projects Found`;
    }
    return onGoingProjects;
};

// To get finished five projects
const getFinishedFiveProjects = async (username) => {
    const projectCollection = await project();
    let staffUser = await user.getUser(username);
    let finishedProjects = undefined;
    if (staffUser.position == "Sales Team") {
        finishedProjects = await projectCollection
            .find({
                projectStatus: { $in: ["Cancelled", "Finished"] },
                salesIncharge: username,
            })
            .limit(5)
            .toArray();
    } else {
        finishedProjects = await projectCollection
            .find({
                projectStatus: { $in: ["Cancelled", "Finished"] },
            })
            .limit(5)
            .toArray();
    }

    if (finishedProjects.length == 0) {
        throw `No Projects Found`;
    }
    return finishedProjects;
};

// To get all finished projects
const getFinishedProjects = async (username) => {
    const projectCollection = await project();
    let staffUser = await user.getUser(username);
    let finishedProjects = undefined;
    if (staffUser.position == "Sales Team") {
        finishedProjects = await projectCollection
            .find({
                projectStatus: { $in: ["Cancelled", "Finished"] },
                salesIncharge: username,
            })
            .toArray();
    } else {
        finishedProjects = await projectCollection
            .find({
                projectStatus: { $in: ["Cancelled", "Finished"] },
            })
            .toArray();
    }
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
    let updatedInfo = undefined;
    const projectCollection = await project();
    const projectStatus = await getProjectByid(id);
    let status = undefined;
    if (typeof id == "string") {
        id = new ObjectId(id);
    }
    if (type == "Start") {
        status = "In-Progress";
        projectProgress = "With Boots on Ground";
        let startDate = new Date().toLocaleDateString();
        updatedInfo = await projectCollection.updateOne(
            { _id: id },
            {
                $set: {
                    projectStatus: status,
                    startDate: startDate,
                    projectProgress: projectProgress,
                },
            }
        );
    }
    if (type == "Finish") {
        status = "Finished";
        let endDate = new Date().toLocaleDateString();
        let projectProgress = "Completed";
        updatedInfo = await projectCollection.updateOne(
            { _id: id },
            {
                $set: {
                    projectStatus: status,
                    endDate: endDate,
                    projectProgress: projectProgress,
                },
            }
        );
    }
    if (type == "Cancel") {
        status = "Cancelled";
        let endDate = new Date().toLocaleDateString();
        let projectProgress = "Cancelled";
        updatedInfo = await projectCollection.updateOne(
            { _id: id },
            {
                $set: {
                    projectStatus: status,
                    endDate: endDate,
                    projectProgress: projectProgress,
                },
            }
        );
    }
    if (updatedInfo.modifiedCount == 0) {
        throw `Couldn't update Status of Project`;
    } else {
        return "Project Status : " + status;
    }
};

//Adding all site inspector info to project
const siteInspectorUpdate = async (
    id,
    roofInfo,
    backyard,
    grid,
    irradiance,
    meterCompatible,
    coordinates,
    permits,
    photos,
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
        permits: permits,
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
                projectProgress: progressStatus,
            },
        }
    );
    if (updatedInfo.modifiedCount == 0) {
        throw `Couldn't update Site Inspector Information`;
    } else {
        return "Site Inspector information updated";
    }
};

// Getting all the site inspector information about specific project
// For Operations Engineer
const getSiteInspectorUpdate = async (id) => {
    validator.validateId(id);
    if (typeof id == "string") {
        id = new ObjectId(id);
    }
    const projectCollection = await project();
    const projectinfo = await projectCollection.findOne({ _id: id });
    if (!projectinfo) {
        throw `No Project Found`;
    }
    return projectinfo.areaInfo;
};

const getImages = async (id) => {
    validator.validateId(id);
    if (typeof id == "string") {
        id = new ObjectId(id);
    }
    const projectCollection = await project();
    const projectinfo = await projectCollection.findOne({ _id: id });
    if (!projectinfo) {
        throw `No Project Found`;
    }
    return projectinfo.images;
};
//For Operations Engineer
const addStaff = async (id, si, oe, tl) => {
    let progressStatus = "With Site Inspector";
    const projectCollection = await project();
    if (typeof id == "string") {
        id = new ObjectId(id);
    }
    let updatedInfo = await projectCollection.updateOne(
        { _id: id },
        {
            $set: {
                siteInspector: si,
                operationEngineer: oe,
                teamLead: tl,
                projectProgress: progressStatus,
            },
        }
    );
    if (updatedInfo.modifiedCount == 0) {
        throw `Couldn't add Staff Information`;
    } else {
        return "Staff Information added";
    }
};

//For operations Engineer
const addEquipment = async (
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
) => {
    if (typeof id == "string") {
        id = new ObjectId(id);
    }
    if (typeof solarCount == "string") {
        solarCount = parseInt(solarCount);
    }
    if (typeof wireCount == "string") {
        wireCount = parseInt(wireCount);
    }
    if (typeof batteryCount == "string") {
        batteryCount = parseInt(batteryCount);
    }
    if (typeof railsCount == "string") {
        railsCount = parseInt(railsCount);
    }
    if (typeof chargeControllerCount == "string") {
        chargeControllerCount = parseInt(chargeControllerCount);
    }
    if (typeof inverterCount == "string") {
        inverterCount = parseInt(inverterCount);
    }
    if (typeof crewCount == "string") {
        crewCount = parseInt(crewCount);
    }
    try {
        let oeFeasible = oeStatus;
        const materialCollection = await material();
        const projectCollection = await project();
        const projects = await projectCollection.findOne({ _id: id });
        if (!projects) {
            throw `No Project Found`;
        }
        let progressStatus = "At Sales Team";
        const solarObject = await materialCollection.findOne({
            type: solarType,
        });
        const wireObject = await materialCollection.findOne({ type: wireType });
        const batteryObject = await materialCollection.findOne({
            type: batteryType,
        });
        const railsObject = await materialCollection.findOne({
            type: railsType,
        });
        const chargeControllerObject = await materialCollection.findOne({
            type: chargeControllerType,
        });
        const inverterObject = await materialCollection.findOne({
            type: inverterType,
        });

        const crewObject = await materialCollection.findOne({ type: crewType });

        let totalCost =
            solarObject.cost * solarCount +
            wireObject.cost * wireCount +
            batteryObject.cost * batteryCount +
            railsObject.cost * railsCount +
            chargeControllerObject.cost * chargeControllerCount +
            inverterObject.cost * inverterCount +
            crewObject.cost * crewCount;

        const equipment = {
            solarType: solarObject.product_name,
            solarCount: solarCount,
            solarCost: solarObject.cost,
            wireType: wireObject.product_name,
            wireCount: wireCount,
            wireCost: wireObject.cost,
            batteryType: batteryObject.product_name,
            batteryCount: batteryCount,
            batteryCost: batteryObject.cost,
            railsType: railsObject.product_name,
            railsCount: railsCount,
            railsCost: railsObject.cost,
            chargeControllerType: chargeControllerObject.product_name,
            chargeControllerCount: chargeControllerCount,
            chargeControllerCost: chargeControllerObject.cost,
            inverterType: inverterObject.product_name,
            inverterCount: inverterCount,
            inverterCost: inverterObject.cost,
            crewType: crewObject.product_name,
            crewCount: crewCount,
            crewCost: crewObject.cost,
            oeFeasible: oeFeasible,
        };
        await projectCollection.updateOne(
            { _id: id },
            {
                $set: {
                    equipment: equipment,
                    projectProgress: progressStatus,
                    totalCost: totalCost,
                },
            }
        );
        // Update Counts
        let solarCountUpdated = solarObject.quantity - solarCount;
        let wireCountUpdated = wireObject.quantity - wireCount;
        let batteryCountUpdated = batteryObject.quantity - batteryCount;
        let railsCountUpdated = railsObject.quantity - railsCount;
        let chargeControllerCountUpdated =
            chargeControllerObject.quantity - chargeControllerCount;
        let inverterCountUpdated = inverterObject.quantity - inverterCount;
        let crewCountUpdated = crewObject.quantity - crewCount;

        await materialCollection.updateOne(
            { type: solarType },
            {
                $set: {
                    quantity: solarCountUpdated,
                },
            }
        );

        await materialCollection.updateOne(
            { type: wireType },
            {
                $set: {
                    quantity: wireCountUpdated,
                },
            }
        );

        await materialCollection.updateOne(
            { type: batteryType },
            {
                $set: {
                    quantity: batteryCountUpdated,
                },
            }
        );

        await materialCollection.updateOne(
            { type: railsType },
            {
                $set: {
                    quantity: railsCountUpdated,
                },
            }
        );

        await materialCollection.updateOne(
            { type: chargeControllerType },
            {
                $set: {
                    quantity: chargeControllerCountUpdated,
                },
            }
        );

        await materialCollection.updateOne(
            { type: inverterType },
            {
                $set: {
                    quantity: inverterCountUpdated,
                },
            }
        );

        await materialCollection.updateOne(
            { type: crewType },
            {
                $set: {
                    quantity: crewCountUpdated,
                },
            }
        );
        if (equipment.modifiedCount == 0) {
            throw `Couldn't add Equipment`;
        } else {
            return "Equipment added to Project";
        }
    } catch (err) {
        console.log(err);
    }
};

const getOngoingCount = async (username) => {
    const projectCollection = await project();
    let staffUser = await user.getUser(username);
    let ongoingProjects = undefined;
    if (staffUser.position == "Sales Team") {
        ongoingProjects = await projectCollection
            .find({
                projectStatus: { $in: ["In-Progress", "Pending"] },
                salesIncharge: username,
            })
            .toArray();
    } else {
        ongoingProjects = await projectCollection
            .find({
                projectStatus: { $in: ["In-Progress", "Pending"] },
            })
            .toArray();
    }
    if (ongoingProjects.length > 0) {
        return ongoingProjects.length;
    } else {
        return 0;
    }
};

const getFinishedCount = async (username) => {
    const projectCollection = await project();
    let staffUser = await user.getUser(username);
    let finishedProjects = undefined;
    if (staffUser.position == "Sales Team") {
        finishedProjects = await projectCollection
            .find({
                projectStatus: { $in: ["Cancelled", "Finished"] },
                salesIncharge: username,
            })
            .toArray();
    } else {
        finishedProjects = await projectCollection
            .find({
                projectStatus: { $in: ["Cancelled", "Finished"] },
            })
            .toArray();
    }
    if (finishedProjects.length > 0) {
        return finishedProjects.length;
    } else {
        return 0;
    }
};

const getCost = async (username) => {
    const projectCollection = await project();
    let staffUser = await user.getUser(username);
    let cost = undefined;
    if (staffUser.position == "Sales Team") {
        cost = await projectCollection
            .find({
                projectStatus: { $in: ["Finished"] },
                salesIncharge: username,
            })
            .toArray();
    } else {
        cost = await projectCollection
            .find({
                projectStatus: { $in: ["Finished"] },
            })
            .toArray();
    }
    let totalSales = 0;
    for (let i = 0; i < cost.length; i++) {
        if (cost[i].totalCost == "Not Assigned") {
            cost[i].totalCost = 0;
        }
        totalSales += cost[i].totalCost;
    }
    return totalSales;
};

//Update Equipment
const updateEquipment = async (
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
) => {
    const projectCollection = await project();
    const project = await projectCollection.findOne({ _id: id });
    let projectStatus = "With Sales Team Equipment Updated";
    if (!solarType) {
        solarType = project.equipment.solarType;
    }
    if (!solarCount) {
        solarCount = project.equipment.solarCount;
    }
    if (!wireType) {
        wireType = project.equipment.wireType;
    }
    if (!wireCount) {
        wireCount = project.equipment.wireCount;
    }
    if (!batteryCount) {
        batteryCount = project.equipment.batteryCount;
    }
    if (!batteryCapacity) {
        batteryCapacity = project.equipment.batteryCapacity;
    }
    if (!railsCount) {
        railsCount = project.equipment.railsCount;
    }
    if (!chargeControllertype) {
        chargeControllertype = project.equipment.chargeControllertype;
    }
    if (!chargeControllerCount) {
        chargeControllerCount = project.equipment.chargeControllerCount;
    }
    if (!inverterType) {
        inverterType = project.equipment.inverterType;
    }
    if (!inverterCount) {
        inverterCount = project.equipment.inverterCount;
    }
    if (!crewCount) {
        crewCount = project.equipment.crewCount;
    }
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
        inverterType: inverterType,
        inverterCount: inverterCount,
        crewCount: crewCount,
    };
    let crewType = "Crew";
    const solarCost = await materialCollection.findOne({ type: solarType });
    const wireCost = await materialCollection.findOne({ type: wireType });
    const batteryCost = await materialCollection.findOne({ type: batteryType });
    const railsCost = await materialCollection.findOne({ type: railsType });
    const chargeControllerCost = await materialCollection.findOne({
        type: chargeControllertype,
    });
    const inverterCost = await materialCollection.findOne({
        type: inverterType,
    });
    const crewCost = await materialCollection.findone({ type: crewType });
    let totalCost =
        solarCost.cost * solarCount +
        wireCost.cost * wireCount +
        batteryCost.cost * batteryCount +
        railsCost.cost * railsCount +
        chargeControllerCost.cost * chargeControllerCount +
        inverterCost.cost * inverterCount +
        crewCost.cost * crewCount;
    let updatedInfo = await project().updateOne(
        { _id: id },
        {
            $set: {
                equipment: equipment,
                totalCost: totalCost,
                projectStatus: projectStatus,
            },
        }
    );
    // Update Counts
    let solarCountUpdated = solarObject.quantity - solarCount;
    let wireCountUpdated = wireObject.quantity - wireCount;
    let batteryCountUpdated = batteryObject.quantity - batteryCount;
    let railsCountUpdated = railsObject.quantity - railsCount;
    let chargeControllerCountUpdated =
        chargeControllerObject.quantity - chargeControllerCount;
    let inverterCountUpdated = inverterObject.quantity - inverterCount;
    let crewCountUpdated = crewObject.quantity - crewCount;

    const updates = [
        {
            filter: { type: solarType },
            update: { $set: { quantity: solarCountUpdated } },
        },
        {
            filter: { type: wireType },
            update: { $set: { quantity: wireCountUpdated } },
        },
        {
            filter: { type: batteryType },
            update: { $set: { quantity: batteryCountUpdated } },
        },
        {
            filter: { type: railsType },
            update: { $set: { quantity: railsCountUpdated } },
        },
        {
            filter: { type: chargeControllerType },
            update: { $set: { quantity: chargeControllerCountUpdated } },
        },
        {
            filter: { type: inverterType },
            update: { $set: { quantity: inverterCountUpdated } },
        },
        {
            filter: { type: crewType },
            update: { $set: { quantity: crewCountUpdated } },
        },
    ];

    let materialUpdate = await Promise.all(
        updates.map((update) =>
            materialCollection.updateOne(update.filter, update.update)
        )
    );
    console.log(materialUpdate);
    if (updatedInfo.modifiedCount == 0) {
        throw `Couldn't add Equipment`;
    } else {
        return "Equipment added to Project";
    }
};

const addRequest = async (id, projectRequest, postedby) => {
    const projectDetails = getProjectByid(id);
    const requestCollection = await requests();
    const newRequest = {
        projectRequest: projectRequest,
        postedby: postedby,
        project: projectDetails.projectAddress,
        date: new Date().toLocaleDateString(),
    };
    const newInsertInformation = await requestCollection.insertOne(newRequest);
    if (newInsertInformation.insertedCount == 0) {
        throw `Could not add request`;
    } else {
        return "Request added";
    }
};

const updateRequest = async (id, status) => {
    const requestCollection = await requests();
    const notesCollection = await notes();
    const projectCollection = await project();
    const requestDetails = await requestCollection.findOne({ _id: id });
    const projectDetails = await projectCollection.findOne({
        projectAddress: requestDetails.projectAddress,
    });
    if ((status = "Approved")) {
        let newnote = requestDetails.projectRequest + " -" + status;
        const newNoteDetails = {
            projectid: projectDetails._id,
            note: newnote,
            postedby: requestDetails.postedby,
            date: new Date().toLocaleDateString(),
        };
        const newInsertNote = await notesCollection.insertOne(newNoteDetails);
        const deletedInfo = await requestCollection.deleteOne({ _id: id });
        if (deletedInfo.deletedCount == 0 || newInsertNote.insertedCount == 0) {
            throw `Could not delete request`;
        } else {
            return `Request ${status}`;
        }
    }
    if ((status = "Denied")) {
        let newnote = requestDetails.projectRequest + " -" + status;
        const newNoteDetails = {
            projectid: projectDetails._id,
            note: newnote,
            postedby: requestDetails.postedby,
            date: new Date().toLocaleDateString(),
        };
        const newInsertNote = await notesCollection.insertOne(newNoteDetails);
        const deletedInfo = await requestCollection.deleteOne({ _id: id });
        if (deletedInfo.deletedCount == 0 || newInsertNote.insertedCount == 0) {
            throw `Could not delete request`;
        } else {
            return `Request ${status}`;
        }
    }
};

const addNote = async (id, note, postedby) => {
    const notesCollection = await notes();
    let newNote = {
        projectid: id,
        note: note,
        postedby: postedby,
        date: new Date().toLocaleDateString(),
    };
    const newInsertInformation = await notesCollection.insertOne(newNote);
    if (newInsertInformation.insertedCount == 0) {
        throw `Could not add note`;
    } else {
        return "Note added";
    }
};

// PUT THE BELOW IN A NEW FILE
// GET ALL THE NOTES
const getNotes = async () => {
    const notesCollection = await notes();
    let notesList = await materialCollection.find({}).toArray();
    if (notesList.length == 0) {
        throw `No Customers Found`;
    }
    return notesList;
};

// POST NOTES BY PROJECT
const postNotes = async (incomingnote, projectid, username) => {
    const notesCollection = await notes();
    if (incomingnote.length == 0) {
        throw `Note Cannnot Be Empty`;
    }
    const notesData = {
        projectId: projectid,
        note: incomingnote,
        postedBy: username,
        postedDate: new Date().toLocaleDateString(),
    };
    const newNotesInfo = await notesCollection.insertOne(notesData);
    if (newNotesInfo.insertedCount == 0) {
        throw `Error In Posting Note`;
    } else {
        return "Created Note";
    }
};
// TILL HERE

// Patch the project
// update customer details
const patchProject = async (
    projectId,
    customerName,
    customerAddress,
    projectAddress,
    customerNumber,
    appointmentDate
) => {
    if (typeof projectId == "string") {
        projectId = new ObjectId(projectId);
    }
    let projectUpdate = undefined;
    let customerUpdate = undefined;
    const projectCollection = await project();
    let projectData = await projectCollection.findOne({ _id: projectId });
    let customerId = projectData.customerId;
    const customerCollection = await customer();
    let customerData = await customerCollection.findOne({ _id: customerId });

    if (projectAddress != projectData.projectAddress) {
        projectUpdate = await projectCollection.updateOne(
            { _id: projectId },
            { $set: { projectAddress: projectAddress } }
        );
    }
    if (appointmentDate != projectData.appointmentDate) {
        projectUpdate = await projectCollection.updateOne(
            { _id: projectId },
            { $set: { appointmentDate: appointmentDate } }
        );
    }

    if (customerName != projectData.customerName) {
        projectUpdate = await projectCollection.updateOne(
            { _id: projectId },
            { $set: { customerName: customerName } }
        );
    }

    if (customerName != customerData.customerName) {
        customerUpdate = await customerCollection.updateOne(
            { _id: customerId },
            { $set: { customerName: customerName } }
        );
    }
    if (customerNumber != customerData.customerNumber) {
        customerUpdate = await customerCollection.updateOne(
            { _id: customerId },
            { $set: { customerNumber: customerNumber } }
        );
    }
    if (customerAddress != customerData.customerAddress) {
        customerUpdate = await customerCollection.updateOne(
            { _id: customerId },
            { $set: { customerAddress: customerAddress } }
        );
    }

    if (customerUpdate.modifiedCount == 0 || projectUpdate.modifiedCount == 0) {
        throw `No updates reflected`;
    }

    return "Project Details Updated";
};

const generateInvoice = async (id) => {
    //This code is incomplete
    if (typeof id == "string") {
        id = new ObjectId(id);
    }
    const projectCollection = await project();
    const projectData = await projectCollection.findOne({ _id: id });
    let equipmentData = projectData.equipment;
    if (!equipmentData) {
        return `No equipment found`;
    } else {
        return equipmentData;
    }

    //figure out how to get the total cost of the project
};

module.exports = {
    createProject,
    getAllProjects,
    getInProgressFiveProjects,
    getFinishedFiveProjects,
    getProjectByid,
    buttonClick,
    siteInspectorUpdate,
    getSiteInspectorUpdate,
    getImages,
    addStaff,
    addEquipment,
    getFinishedProjects,
    getOngoingProjects,
    getOngoingCount,
    getFinishedCount,
    getCost,
    updateEquipment,
    addRequest,
    updateRequest,
    addNote,
    // NOTES
    getNotes,
    postNotes,
    patchProject,
    generateInvoice,
};
