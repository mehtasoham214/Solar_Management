const mongoCollections = require("../db/collection");
const customer = mongoCollections.customer;
const project = mongoCollections.project;
const leads = mongoCollections.leads;
const { ObjectId } = require("mongodb");
const validator = require("../validator");

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
    validator.validateId(id);
    if (typeof id == "string") {
        id = new ObjectId(id);
    }
    const projectCollection = await customer();
    const projectinfo = await projectCollection.findOne({ _id: id });
    const customerId = projectinfo.customerId;
    const customerCollection = await customer();
    const customerinformation = await customerCollection.findOne({
        _id: customerId,
    });
    let finalInfo = {
        customerName: customerinformation.customerName,
        customerNumber: customerinformation.customerNumber,
        customerAddress: customerinformation.customerAddress,
        projectAddress: projectinfo.projectAddress,
        siteInspector: projectinfo.siteInspector,
        operationsEngineer: projectinfo.operationsEngineer,
        teamLead: projectinfo.teamLead,
        projectStatus: projectinfo.projectStatus,
        projectProgress: projectinfo.projectProgress,
        projectStartDate: projectinfo.projectStartDate,
        projectEndDate: projectinfo.projectEndDate,
        totalCost: projectinfo.totalCost,
    };

    if (!finalInfo) {
        throw `No Customer Found`;
    }
    return finalInfo;
};

const getLeads = async () => {
    const leadsCollection = await leads();
    const leadsList = await leadsCollection.find({}).toArray();
    if (!leadsList) {
        throw `No Leads Found`;
    }
    return leadsList;
};

module.exports = {
    getCustomerByid,
    patchCustomer,
    getLeads,
};
