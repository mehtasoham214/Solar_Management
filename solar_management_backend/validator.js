const { ObjectId } = require("mongodb");
function validateUser(username) {
    // Validating user name
    if (username == null) {
        throw `Username cannot be empty`;
    }

    if (typeof username != "string") {
        throw `Username should be a string`;
    }

    if (username.trim().length < 4) {
        throw `Username should contain atleast 4 characters`;
    }

    if (!username.match(/^[0-9a-zA-Z]+$/)) {
        throw `Username should contain only alphanumeric characters`;
    }
}

function validatePassword(password) {
    // Validating password
    if (password == null) {
        throw `Password cannot be empty`;
    }

    if (typeof password != "string") {
        throw `Password should be a string`;
    }

    if (password.trim().length < 6) {
        throw `Password should contain atleast 6 characters`;
    }

    if (
        !password.match(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,50}$/
        )
    ) {
        throw `Password should contain one uppercase character,one lowercase character, one number and one special character`;
    }
}

function validateCustomerandProject(
    customerName,
    customerAddress,
    customerNumber,
    projectAddress
) {
    if (typeof customerName !== "string" || customerName.length < 0) {
        throw `Customer Name is incorrect`;
    }
    if (typeof customerAddress !== "string" || customerAddress.length < 0) {
        throw `Customer Address is incorrect`;
    }
    if (customerNumber.length < 0) {
        throw `Customer Number is incorrect`;
    }
    if (typeof projectAddress !== "string" || projectAddress.length < 0) {
        throw `Project Address is incorrect`;
    }
}

function validateId(id) {
    // Validating id
    if (!id) {
        throw `You must provide an id to search for`;
    }
    if (typeof id !== "string") {
        throw `Id must be a string`;
    }
    if (id.trim().length === 0) {
        throw `Id cannot be an empty string or just spaces`;
    }
    id = id.trim();
    if (!ObjectId.isValid(id)) {
        throw "Invalid object ID";
    }
}

function validateAreaParameter(roofInfo, backyard, grid, meterCompatible) {
    //Assuming that parameter are stored in format "5x10"
    validateLength(roofInfo);
    validateLength(backyard);

    if (grid !== "ON" || grid !== "OFF" || grid !== "Hybrid") {
        throw `Grid must be either ON, OFF or Hybrid`;
    }
    if (meterCompatible !== "Yes" || meterCompatible !== "No") {
        throw `Meter compatible must be either Yes or No`;
    }
}

function validateLength(infoStr) {
    var parts = infoStr.split("x");

    // Check if there are exactly two parts
    if (parts.length !== 2) {
        throw `You must provide Length and Width`;
    }

    // Check if both parts are numeric
    var length = parseFloat(parts[0]);
    var width = parseFloat(parts[1]);
    if (length == null || width == null) {
        throw `You must provide Length of Roof`;
    }

    // Check if the values are within a reasonable range
    if (length <= 0 || width <= 0) {
        throw `Length should be a greater than 0`;
    }
}
module.exports = {
    validateLength,
    validateAreaParameter,
    validateId,
    validateCustomerandProject,
    validateUser,
    validatePassword,
};
