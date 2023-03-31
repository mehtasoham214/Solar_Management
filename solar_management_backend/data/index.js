const projectdata = require ('./project')
const customerdata = require('./customer')
const userdata = require('./user')
const materialdata = require('./materials')

module.exports = {
    customer : customerdata,
    project : projectdata,
    user : userdata,
    materials: materialdata
}