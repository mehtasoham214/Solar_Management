const dbConnection = require("./conn.js");

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const client = await dbConnection.connectToDatabase();
      const db = client.db('solar');
      _col = await db.collection(collection);
    }

    return _col;
  };
};

module.exports = {
  user: getCollectionFn("user"),
  customer: getCollectionFn("customer"),
  project: getCollectionFn("project"),
  material: getCollectionFn("material")
};