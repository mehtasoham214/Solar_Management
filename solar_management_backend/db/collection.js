const dbConnection = require("./conn");

const getCollectionFn = (collection) => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const db = await dbConnection.dbConnection();
            _col = await db.collection(collection);
        }

        return _col;
    };
};

module.exports = {
    user: getCollectionFn("user"),
    customer: getCollectionFn("customer"),
    project: getCollectionFn("project"),
    material: getCollectionFn("material"),
};
