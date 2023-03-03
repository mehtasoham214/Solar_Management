const projectdata = require ('./project')
const customerdata = require('./customer')
const userdata = require('./user')

module.exports = {
    customer : customerdata,
    project : projectdata,
    user : userdata
}