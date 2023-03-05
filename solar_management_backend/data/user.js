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

module.exports = {
    createUser,
    getUser,
};
