// Add code for create project POST
// Add code for fetch top 5 projects GET
// Add code to fetch all projects ( and covert in to 2 arrays) GET
// Add code to fetch single selected project GET
// Add code to update project information PATCH
// Add field validation 

// Types of update:
// 1. Button to start, end, cancel
// 2. add information from site inspector (project parameters)
// 3. add information from opereations engineer (equipment, name of site inspector)
// 4. add information from 

const mongoCollections = require("../db/collection");
const project = mongoCollections.project;
const {ObjectId} = require('mongodb');
const validator = require('../validator');
const createProject = async() => {
}


module.exports= {
    createProject,
    fetchAllProject,
    fetchFiveProject
}