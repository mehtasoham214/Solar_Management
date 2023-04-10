const mongoCollections = require("../db/collection");
const material = mongoCollections.material;
const project = mongoCollections.project;
const companyuser = mongoCollections.users;
const { ObjectId } = require("mongodb");
const validator = require("../validator");
const user = require("./user");

const getMaterials = async (username) => {
    let staffUser = await user.getUser(username);
    const materialCollection = await material();
    let materialsList = undefined;
    if (staffUser.position == "Operations Engineer") {
        materialsList = await materialCollection
            .find({})
            .toArray();
    }

    if (materialsList.length == 0) {
        throw `No Materials Found`;
    }
    return materialsList;
};

const allocateMaterials = async (username,projectId) => {
    let staffUser = await user.getUser(username);
    let projectData = undefined;
    const projectCollection = await project();
    const materialCollection = await material();
    if (staffUser.position == "Operations Engineer") {
        projectData = await projectCollection
            .find({operationsEngineer: username})
            .toArray();
    }

    if (materialsList.length == 0) {
        throw `No Materials Found`;
    }
    return materialsList;
};

module.exports = {
    getMaterials,
};
