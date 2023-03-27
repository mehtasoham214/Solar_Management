const express = require("express");
const app = express();
const configRoutes = require("./routes");
const cors = require("cors")

require("dotenv").config({ path: "./config.env" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  }
  app.use(allowCrossDomain);

app.use(require("./routes/project"));
configRoutes(app);

app.listen(4000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:4000");
});
