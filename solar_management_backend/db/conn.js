const { MongoClient } = require("mongodb");
const settings = require("./settings");
const mongoConfig = settings.mongoConfig;
const serverUrl = mongoConfig.serverUrl;
const dbName = mongoConfig.database;

let _connection = undefined;
let _db = undefined;

async function connectToDatabase() {
    const client = new MongoClient(serverUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        // Connect to MongoDB API
        if (!_connection) {
            _connection = await client.connect();
            _db = await _connection.db(dbName);
            console.log("Connected to MongoDB API");
        }
        if (!serverUrl || !dbName) {
            throw `MongoDB configuration not found `;
        }
    } catch (err) {
        console.error(err);
    }
}

async function closeDatabaseConnection() {
    if (_connection) {
        await _connection.close();
        console.log("Disconnected from MongoDB API");
    }
}

module.exports = {
    connectToDatabase,
    closeDatabaseConnection,
};
