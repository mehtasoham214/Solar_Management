const mongoCollections = require("../db/collection");
const customer = mongoCollections.customer;
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
    const customerCollection = await customer();
    const customerinfo = await customerCollection.findOne({ _id: id });
    if (!customerinfo) {
        throw `No Customer Found`;
    }
    return customerinfo;
};

module.exports = {
    getCustomerByid,
    patchCustomer,
};
