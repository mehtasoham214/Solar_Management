const mongoCollections = require("../db/collection");
const userCol = mongoCollections.users;
const customer = mongoCollections.customer;
const { ObjectId } = require("mongodb");
const validator = require("../validator");

// Create a new user as Operations Manager
const createNewStaff = async (name, username, email, position, contact) => {
    const usercollection = await userCol();
    const userInfo = {
        name: name,
        username: username,
        email: email,
        password: undefined,
        position: position,
        contact: contact,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
    };
    const userInserted = await usercollection.insertOne(userInfo);
    if (userInserted.insertedCount == 0) {
        throw `User was not created`;
    } else {
        return "User Created Successfully";
    }
};

const createUser = async (
    name,
    username,
    password,
    email,
    position,
    contact
) => {
    const usercollection = await userCol();
    const userInfo = {
        name: name,
        username: username,
        password: password,
        email: email,
        position: position,
        contact: contact,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
    };
    const userInserted = await usercollection.insertOne(userInfo);
    if (userInserted.insertedCount == 0) {
        throw `User was not created`;
    } else {
        return "User Created Successfully";
    }
};

// Get Staff Details
const getUser = async (username) => {
    const usercollection = await userCol();
    validator.validateUser(username.trim());
    const user = await usercollection.findOne({
        username: username,
    });
    if (user) {
        return user;
    } else {
        throw `User Doesn't Exists`;
    }
};

// Get all site inspector details
const getAllSiteInspector = async () => {
    const siteInspector = await userCol();
    const siteInsperctorList = await siteInspector
        .find({
            position: "Site Inspector",
        })
        .toArray();
    if (siteInsperctorList.length == 0) {
        return `No Site Inspectors Found`;
    }
    return siteInsperctorList;
};

// Get all team lead information
const getAllTeamLeads = async () => {
    const teamLeadCollection = await userCol();
    let teamLeadsList = await teamLeadCollection
        .find({
            position: "Team Lead",
        })
        .toArray();
    if (teamLeadsList.length == 0) {
        return `No Team Leads Found`;
    }
    return teamLeadsList;
};

// get all operations engineer details
const getAllOperationsEngineer = async () => {
    const operationsEngineerCollection = await userCol();
    let operationsEngineerList = await operationsEngineerCollection
        .find({
            position: "Operations Engineer",
        })
        .toArray();
    if (operationsEngineerList.length == 0) {
        return `No Operations Engineers Found`;
    }
    return operationsEngineerList;
};

// get all sales team information
const getAllSalesTeam = async () => {
    const salesTeamCollection = await userCol();
    let salesTeamList = await salesTeamCollection
        .find({
            position: "Sales Team",
        })
        .toArray();
    if (salesTeamList.length == 0) {
        return `No Operations Engineers Found`;
    }
    return salesTeamList;
};

module.exports = {
    createNewStaff,
    createUser,
    getUser,
    getAllSiteInspector,
    getAllTeamLeads,
    getAllOperationsEngineer,
    getAllSalesTeam,
};
