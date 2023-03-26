const mongoCollections = require("../db/collection");
const user = mongoCollections.user;
const customer = mongoCollections.customer;
const { ObjectId } = require("mongodb");
const validator = require("../validator");

const createUser = async (username, password, type) => {
    const usercollection = await user();
    validateUser(username.trim());
    validatePassword(password.trim());
    const user = await usercollection.findOne({
        username: username,
        password: password,
    });
    if (user) {
        throw `User Already Exists`;
    }
    const userInfo = {
        username,
        password,
        type,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const userInserted = await usercollection.insertOne(userInfo);
    if (userInserted.insertedCount == 0) {
        throw `User was be created`;
    } else {
        return "User Created Successfully";
    }
};

const getUser = async (username, password) => {
    const usercollection = await user();
    validateUser(username.trim());
    validatePassword(password.trim());
    const user = await usercollection.findOne({
        username: username,
        password: password,
    });
    if (user) {
        return user;
    } else {
        throw `User Doesn't Exists`;
    }
};

const getAllSiteInspector = async () => {
    const siteInspector = await user();
    const siteInsperctorList = await siteInspector.find({
        position: "Site Inspector",
    });
    if (siteInsperctorList.length == 0) {
        throw `No Site Inspectors Found`;
    }
    return siteInsperctorList;
};

const getAllTeamLeads = async() => {
    const teamLeadCollection = await user();
    let teamLeadsList = await teamLeadCollection
    .find({
        position: "Team Lead",
    })
    .toArray();
    if (teamLeadsList.length == 0) {
        throw `No Team Leads Found`;
    }
    return teamLeadsList;
};

const getAllOperationsEngineer = async() => {
    const operationsEngineerCollection = await user();
    let operationsEngineerList = await operationsEngineerCollection
    .find({
        position: "Operations Engineer"
    })
    .toArray();
    if (operationsEngineerList.length == 0) {
        throw `No Operations Engineers Found`;
    }
    return operationsEngineerList;
};

const getAllSalesTeam = async() => {
    const salesTeamCollection = await user();
    let salesTeamList = await salesTeamCollection
    .find({
        position: "Sales"
    })
    .toArray();
    if (salesTeamList.length == 0) {
        throw `No Operations Engineers Found`;
    }
    return salesTeamList;
};

module.exports = {
    createUser,
    getUser,
    getAllSiteInspector,
    getAllTeamLeads,
    getAllOperationsEngineer,
    getAllSalesTeam
};
