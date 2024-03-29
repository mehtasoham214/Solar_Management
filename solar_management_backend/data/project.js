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

        //Inserting First Note
        let note = `Project Created`;
        let postedby = sales;
        const notesCollection = await notes();
        //Created Note Object for NoteData
        let noteInfo = {
            _id: new ObjectId(),
            note: note,
            postedby: postedby,
            date: new Date().toLocaleDateString(),
        };
        //Inserting Note Object for Project
        let newNote = {
            projectid: projectId,
            noteData: [noteInfo],
        };

        const newNoteInfo = await notesCollection.insertOne(newNote);

        if (newInfo.insertedCount == 0 || newCustInfo.insertedCount == 0) {
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
    } 
    // CHECK IF USER IS A OPS ENGINEER
    else if(staffUser.position == "Operations Engineer"){
        inProgressProjects = await projectCollection
            .find({
                projectProgress:"With Operations Engineer",
                operationEngineer: username,
            })
            .limit(5)
            .toArray();
    }
    // CHECK IF USER IS A SITE ENGINEER
    else if(staffUser.position == "Site Inspector"){
        inProgressProjects = await projectCollection
            .find({
                projectProgress:"With Site Inspector",
                siteInspector: username,
            })
            .limit(5)
            .toArray();
    }
    // CHECK IF USER IS A Team Lead
    else if(staffUser.position == "Team Lead"){
        inProgressProjects = await projectCollection
            .find({
                projectProgress:"With Boots on Ground",
                teamLead: username,
            })
            .limit(5)
            .toArray();
    }        
    else {
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
    }
    else if(staffUser.position == "Operations Engineer"){
        onGoingProjects = await projectCollection
            .find({
                projectStatus: { $in: ["In-Progress", "Pending"] },
                operationEngineer: username,
            })
            .toArray();
    }
    // CHECK IF USER IS A OPS ENGINEER
    else if(staffUser.position == "Site Inspector"){
        onGoingProjects = await projectCollection
            .find({
                projectStatus: { $in: ["In-Progress", "Pending"] },
                siteInspector: username,
            })
            .toArray();
    }
        // CHECK IF USER IS A Team Lead
        else if(staffUser.position == "Team Lead"){
            onGoingProjects = await projectCollection
                .find({
                    projectProgress:"With Boots on Ground",
                    teamLead: username,
                })
                .toArray();
        }     
    else {
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
    } 
    else if(staffUser.position== "Operations Engineer"){
        finishedProjects = await projectCollection
            .find({
                projectStatus: { $in: ["Cancelled", "Finished"] },
                operationEngineer: username,
            })
            .limit(5)
            .toArray();
    }
    else if(staffUser.position== "Site Inspector"){
        finishedProjects = await projectCollection
            .find({
                projectStatus: { $in: ["Cancelled", "Finished"] },
                siteInspector: username,
            })
            .limit(5)
            .toArray();
    }
    // CHECK IF USER IS A Team Lead
    else if(staffUser.position == "Team Lead"){
        finishedProjects = await projectCollection
            .find({
                projectStatus: { $in: ["Cancelled", "Finished"] },
                teamLead: username,
            })
            .limit(5)
            .toArray();
    } 
    else {
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
    } 
    else if(staffUser.position == "Operations Engineer"){
        finishedProjects = await projectCollection
            .find({
                projectStatus: { $in: ["Cancelled", "Finished"] },
                operationEngineer: username,
            })
            .toArray();
    }
    // CHECK IF USER IS A OPS ENGINEER
    else if(staffUser.position == "Site Inspector"){
        finishedProjects = await projectCollection
            .find({
                projectStatus: { $in: ["Cancelled", "Finished"] },
                siteInspector: username,
            })
            .toArray();
    }
    // CHECK IF USER IS A Team Lead
    else if(staffUser.position == "Team Lead"){
        finishedProjects = await projectCollection
            .find({
                projectStatus: { $in: ["Cancelled", "Finished"] },
                teamLead: username,
            })
            .toArray();
    }    
    else {
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
const buttonClick = async (id, type, username) => {
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

    if (type == "Done") {
        status = "Ground Work Completed";
        let endDate = new Date().toLocaleDateString();
        let projectProgress = "Boots on Ground Work Completed";
        updatedInfo = await projectCollection.updateOne(
            { _id: id },
            {
                $set: {
                    projectStatus: status,
                    projectProgress: projectProgress,
                },
            }
        );
    }
    let note = "Project Status Changed to " + status;
    let noteInfo = {
        _id: new ObjectId(),
        note: note,
        postedby: username,
        date: new Date().toLocaleDateString(),
    };
    const notesCollection = await notes();
    const newInsertInformation = await notesCollection.updateOne(
        { projectid: id },
        { $push: { noteData: noteInfo } }
    );
    if (updatedInfo.modifiedCount == 0) {
        throw `Couldn't update Status of Project`;
    } else {
        return "Project Status : " + status;
    }
};

//Adding all site inspector info to project
const siteInspectorUpdate = async (
    id,
    backyardInfo,
    roofInfo,
    grid,
    irradiance,
    meterCompatibility,
    coordinates,
    environment,
    building,
    electrical,
    zone,
    landUse,
    interconnection,
    netMetering,
    propertyEasement,
    hoa,
    feasibility,
    structuralFeasibility,
    photos,
    username
) => {
    const projectCollection = await project();
    //const project = await projectCollection.findOne({ _id: id });
    if (typeof id == "string") {
        id = new ObjectId(id);
    }
    const siteInspector = {
        id,
        backyardInfo:backyardInfo,
        roofInfo:roofInfo,
        grid:grid,
        irradiance:irradiance,
        meterCompatibility:meterCompatibility,
        coordinates:coordinates,
        environment:environment,
        building:building,
        electrical:electrical,
        zone:zone,
        landUse:landUse,
        interconnection:interconnection,
        netMetering:netMetering,
        propertyEasement:propertyEasement,
        hoa:hoa,
        feasibility:feasibility,
        structuralFeasibility:structuralFeasibility
    };
    let progressStatus = "With Operations Engineer";
    const pictures = {
        photos: photos,
    };
    const updatedInfo = await projectCollection.updateOne(
        { _id: id },
        {
            $set: {
                areaInfo: siteInspector,
                images: pictures,
                projectProgress: progressStatus,
            },
        }
    );
    //Added site Inspector Info to notes
    let note = "Site Inspector Information Updated";
    let noteInfo = {
        _id: new ObjectId(),
        note: note,
        postedby: username,
        date: new Date().toLocaleDateString(),
    };
    const notesCollection = await notes();
    const newInsertInformation = await notesCollection.updateOne(
        { projectid: id },
        { $push: { noteData: noteInfo } }
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

// Get Project related Images
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
//For Operations Manager to add staff
const addStaff = async (id, si, oe, tl, username) => {
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
    let note = "Staff Information Updated";
    let noteInfo = {
        _id: new ObjectId(),
        note: note,
        postedby: username,
        date: new Date().toLocaleDateString(),
    };
    const notesCollection = await notes();
    const newInsertInformation = await notesCollection.updateOne(
        { projectid: id },
        { $push: { noteData: noteInfo } }
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
    oeStatus,
    username
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

        //Adding Note
        let note = "OE added Equipment to Project";
        let noteInfo = {
            _id: new ObjectId(),
            note: note,
            postedby: username,
            date: new Date().toLocaleDateString(),
        };
        const notesCollection = await notes();
        const newInsertInformation = await notesCollection.updateOne(
            { projectid: id },
            { $push: { noteData: noteInfo } }
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

// Get Number of Ongoing Projects
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

// Get Number of Finished Projects
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

// Calculate total sales cost
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
    crewCount,
    username
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
    let note = "Equipment Updated by OM";
    let noteInfo = {
        _id: new ObjectId(),
        note: note,
        postedby: username,
        date: new Date().toLocaleDateString(),
    };
    const notesCollection = await notes();
    const newInsertInformation = await notesCollection.updateOne(
        { projectid: id },
        { $push: { noteData: noteInfo } }
    );
    if (updatedInfo.modifiedCount == 0) {
        throw `Couldn't add Equipment`;
    } else {
        return "Equipment added to Project";
    }
};

//Get Equipment
const getEquipment = async (id) => {
    if (typeof id == "string") {
        id = new ObjectId(id);
    }
    let equipmentData = undefined;
    const projectCollection = await project();
    const projectData = await projectCollection.findOne({ _id: id });
    equipmentData = projectData.equipment;
    if (equipmentData != undefined) {
        return equipmentData;
    } else {
        return "No Equipment Added";
    }
};

// Add a request as Team Lead
const addRequest = async (id, projectRequest, projectAddress, postedby) => {
    const requestCollection = await requests();
    if (typeof id == "string") {
        id = new ObjectId(id);
    }
    let status = 'Pending';
    const newRequest = {
        projectRequest: projectRequest,
        postedby: postedby,
        project: projectAddress,
        date: new Date().toLocaleDateString(),
        status: status
    };
    const newInsertInformation = await requestCollection.insertOne(newRequest);
    let note = `New Request Added`
    let noteInfo = {
        _id: new ObjectId(),
        note: note,
        postedby: postedby,
        date: new Date().toLocaleDateString(),
    };
    const notesCollection = await notes();
    const newNoteInformation = await notesCollection.updateOne(
        { projectAddress: id },
        { $push: { noteData: noteInfo } }
    );
    if (newNoteInformation.insertedCount == 0) {
        throw `Could not add request`;
    } else {
        return "Request added";
    }
};

// Approve or Deny a request
const updateRequest = async (id, status) => {
    const requestCollection = await requests();
    const notesCollection = await notes();
    const projectCollection = await project();
    if (typeof id == "string") {
        id = new ObjectId(id);
    }
    const requestDetails = await requestCollection.findOne({ _id: id });
    const projectDetails = await projectCollection.findOne({
        projectAddress: requestDetails.project,
    });
    if ((status === "Approve")) {
        status = "Approved"
        let newnote = requestDetails.projectRequest + " - " + status;
        let noteInfo = {
            _id: new ObjectId(),
            note: newnote,
            postedby: requestDetails.postedby,
            date: new Date().toLocaleDateString(),
        };
        const newInsertInformation = await notesCollection.updateOne(
            { projectid: projectDetails._id },
            { $push: { noteData: noteInfo } }
        );
        const updatedRequest = await requestCollection.updateOne({ _id: id },
            {$set:{status: status}});
        if (updatedRequest.modifiedCount == 0 || newInsertInformation.modifiedCount == 0) {
            throw `Could not update request`;
        } else {
            return `Request ${status}`;
        }
    }
    if ((status === "Deny")) {
        status = "Denied"
        let newnote = requestDetails.projectRequest + " - " + status;
        let noteInfo = {
            _id: new ObjectId(),
            note: newnote,
            postedby: requestDetails.postedby,
            date: new Date().toLocaleDateString(),
        };
        const newInsertInformation = await notesCollection.updateOne(
            { projectid: projectDetails._id },
            { $push: { noteData: noteInfo } }
        );
        const updatedRequest = await requestCollection.updateOne({ _id: id },
            {$set:{status: status}});
        if (updatedRequest.modifiedCount == 0 || newInsertInformation.modifiedCount == 0) {
            throw `Could not update request`;
        } else {
            return `Request ${status}`;
        }
    }
};

//Adding Notes to Note Collection
const addNote = async (id, note, postedby) => {
    if (typeof id === "string") {
        id = new ObjectId(id);
    }
    const notesCollection = await notes();
    let newInsertInformation = undefined;
    let noteInfo = {
        _id: new ObjectId(),
        note: note,
        postedby: postedby,
        date: new Date().toLocaleDateString(),
    };
    const noteData = await notesCollection.findOne({ projectid: id });
    if (!noteData) {
        newInsertInformation = await notesCollection.insertOne({
            projectid: id,
            noteData: [noteInfo],
        });
    } else {
        newInsertInformation = await notesCollection.updateOne(
            { projectid: id },
            { $push: { noteData: noteInfo } }
        );
    }
    if (
        newInsertInformation.insertedCount == 0 ||
        newInsertInformation.modifiedCount == 0
    ) {
        throw `Could not add note`;
    } else {
        return "Note added";
    }
};

// GET ALL THE NOTES
const getNotes = async (id) => {
    if (typeof id === "string") {
        id = new ObjectId(id);
    }
    const notesCollection = await notes();
    let notesList = await notesCollection.findOne({ projectid: id });
    return notesList.noteData;
};

// Patch the project
// update customer details
const patchProject = async (
    projectId,
    customerName,
    customerAddress,
    projectAddress,
    customerNumber,
    appointmentDate,
    username
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
    let newNote = "Project Details Updated";
    let noteInfo = {
        _id: new ObjectId(),
        note: newNote,
        postedby: username,
        date: new Date().toLocaleDateString(),
    };
    const notesCollection = await notes();
    const newInsertInformation = await notesCollection.updateOne(
        { projectid: projectId },
        { $push: { noteData: noteInfo } }
    );
    if (customerUpdate.modifiedCount == 0 || projectUpdate.modifiedCount == 0) {
        throw `No updates reflected`;
    }

    return newNote;
};

// Get Equipment data to generate invoice as PDF
const generateInvoice = async (id) => {
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
};

// Get all Pending Requests
const getPendingRequests = async (username) => {
    const requestCollection = await requests();
    let staffUser = await user.getUser(username);
    let pendingProjects = undefined;
    if (staffUser.position == "Operations Manager") {
        pendingProjects = await requestCollection
            .find({
                status: "Pending",
            })
            .toArray();
    } 
    else if(staffUser.position == "Team Lead"){
        pendingProjects = await requestCollection
            .find({
                status: "Pending",
                postedby: username
            })
            .toArray();
    }
    if (pendingProjects.length == 0) {
        throw `No Requests Found`;
    }
    return pendingProjects;
};

// Get all Finished Requests
const getFinishedRequests = async (username) => {
    const requestCollection = await requests();
    let staffUser = await user.getUser(username);
    let finishedProjects = undefined;
    if (staffUser.position == "Operations Manager") {
        finishedProjects = await requestCollection
            .find({
                status: {$in:["Approved","Denied"]},
            })
            .toArray();
    } 
    else if(staffUser.position == "Team Lead"){
        finishedProjects = await requestCollection
            .find({
                status: {$in:["Approved","Denied"]},
                postedby: username
            })
            .toArray();
    }
    if (finishedProjects.length == 0) {
        throw `No Requests Found`;
    }
    return finishedProjects;
};

module.exports = {
    createProject,
    // Get Projects Details
    getAllProjects,
    getInProgressFiveProjects,
    getFinishedFiveProjects,
    getFinishedProjects,
    getOngoingProjects,
    getOngoingCount,
    getFinishedCount,
    getProjectByid,
    getCost,
    getImages,
    // Handle Buttons
    buttonClick,
    // Site Inspector
    siteInspectorUpdate,
    getSiteInspectorUpdate,
    // Operations Engineer
    addEquipment,
    getEquipment,
    updateEquipment,
    // Operations Managet
    addStaff,
    // NOTES
    addNote,
    getNotes,
    patchProject,
    generateInvoice,
    // Requests
    addRequest,
    updateRequest,
    getPendingRequests,
    getFinishedRequests,
};
