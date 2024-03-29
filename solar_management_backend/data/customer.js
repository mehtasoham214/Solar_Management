const mongoCollections = require("../db/collection");
const customer = mongoCollections.customer;
const project = mongoCollections.project;
const leads = mongoCollections.leads;
const companyuser = mongoCollections.users;
const { ObjectId } = require("mongodb");
const validator = require("../validator");
const user = require("./user");

// update customer details
const patchCustomer = async (
    customerId,
    customerName,
    customerAddress,
    customerNumber
) => {
    let customerInfo = await getCustomerByid(customerId);
    if (!customerName) {
        customerName = customerInfo.customerName;
    }
    if (!customerNumber) {
        customerNumber = customerInfo.customerNumber;
    }
    if (!customerAddress) {
        customerAddress = customerInfo.customerAddress;
    }

    validator.validateId(customerId);
    validator.validateCustomer(customerName, customerAddress, customerNumber);

    let newCustomer = {};
    if (typeof customerId == "string") {
        customerId = new ObjectId(customerId);
    }
    if (customerName) {
        newCustomer.customerName = customerName;
    }
    if (customerAddress) {
        newCustomer.customerAddress = customerAddress;
    }
    if (customerNumber) {
        newCustomer.customerNumber = customerNumber;
    }

    const customerCollection = await customer();
    const updatedInfo = await customerCollection.updateOne(
        { _id: customerId },
        { $set: newCustomer }
    );
    if (updatedInfo.modifiedCount == 0) {
        throw `No updates reflected`;
    }
    return "Customer Details Updated";
};

// get Customer by ID
const getCustomerByid = async (id) => {
    if (typeof id == "string") {
        id = new ObjectId(id);
    }
    let salesIncharge = undefined;
    let siteInspector = undefined;
    let operationEngineer = undefined;
    let teamLead = undefined;
    const projectCollection = await project();
    const projectinfo = await projectCollection.findOne({ _id: id });
    const customerId = projectinfo.customerId;
    const customerCollection = await customer();
    const customerinformation = await customerCollection.findOne({
        _id: customerId,
    });
    const companyuserInfo = await companyuser();
    if (projectinfo.salesIncharge != "Not Assigned") {
        salesIncharge = await companyuserInfo.findOne({
            username: projectinfo.salesIncharge,
        });
        salesIncharge = salesIncharge.name;
    } else {
        salesIncharge = "Not Assigned";
    }
    if (projectinfo.siteInspector != "Not Assigned") {
        siteInspector = await companyuserInfo.findOne({
            username: projectinfo.siteInspector,
        });
        siteInspector = siteInspector.name;
    } else {
        siteInspector = "Not Assigned";
    }
    if (projectinfo.operationEngineer != "Not Assigned") {
        operationEngineer = await companyuserInfo.findOne({
            username: projectinfo.operationEngineer,
        });
        operationEngineer = operationEngineer.name;
    } else {
        operationEngineer = "Not Assigned";
    }
    if (projectinfo.teamLead != "Not Assigned") {
        teamLead = await companyuserInfo.findOne({
            username: projectinfo.teamLead,
        });
        teamLead = teamLead.name;
    } else {
        teamLead = "Not Assigned";
    }

    let finalInfo = {
        customerName: customerinformation.customerName,
        customerNumber: customerinformation.customerNumber,
        customerAddress: customerinformation.customerAddress,
        projectID: projectinfo._id,
        projectAddress: projectinfo.projectAddress,
        projectId: projectinfo._id,
        salesIncharge: salesIncharge,
        siteInspector: siteInspector,
        operationEngineer: operationEngineer,
        teamLead: teamLead,
        projectStatus: projectinfo.projectStatus,
        projectProgress: projectinfo.projectProgress,
        projectAppointmentDate: projectinfo.appointmentDate,
        projectStartDate: projectinfo.startDate,
        projectEndDate: projectinfo.endDate,
        totalCost: projectinfo.totalCost,
    };
    if (!finalInfo.projectStartDate) {
        finalInfo.projectStartDate = "Not Assigned";
    }
    if (!finalInfo.projectEndDate) {
        finalInfo.projectEndDate = "Not Assigned";
    }
    if (!finalInfo.totalCost) {
        finalInfo.totalCost = "Not Assigned";
    }

    if (!finalInfo) {
        throw `No Customer Found`;
    }
    return finalInfo;
};

// get leads details
const getLeads = async (username) => {
    const leadCollection = await leads();
    let staffUser = await user.getUser(username);
    let leadslist = undefined;
    if (staffUser.position == "Sales Team") {
        leadslist = await leadCollection
            .find({
                salesIncharge: username,
            })
            .toArray();
    } else {
        leadslist = await leadCollection.find({}).toArray();
    }
    if (leadslist.length == 0) {
        throw `No Leads Found`;
    }
    return leadslist;
};

// get customer details
const getCustomers = async (username) => {
    let staffUser = await user.getUser(username);
    const projectCollection = await project();
    let ongoingProjects = undefined;
    if (staffUser.position == "Sales Team") {
        ongoingProjects = await projectCollection
            .find({ salesIncharge: username })
            .toArray();
    }
    const customerCollection = await customer();
    let customerList = await customerCollection
        .aggregate([
            {
                $lookup: {
                    from: "project",
                    localField: "_id",
                    foreignField: "customerId",
                    as: "projects",
                },
            },
            {
                $match: {
                    "projects.salesIncharge": username,
                },
            },
            {
                $project: {
                    customerName: "$customerName",
                    customerNumber: "$customerNumber",
                    customerAddress: "$customerAddress",
                    projectAddress: "$projects.projectAddress",
                    projectId: "$projects._id",
                },
            },
        ])
        .toArray();

    if (customerList.length == 0) {
        throw `No Customers Found`;
    }
    for (let i = 0; i < customerList.length; i++) {
        customerList[i].projectId = customerList[i].projectId[0].toString();
    }
    for (let i = 0; i < customerList.length; i++) {
        if (typeof customerList[i].projectId == "string") {
            console.log(typeof customerList[i].projectId);
        }
    }
    // customerList.projectId = customerList.projectId.toString();
    return customerList;
};
module.exports = {
    getCustomerByid,
    patchCustomer,
    getLeads,
    getCustomers,
};
