const express = require("express");
const app = express();
const configRoutes = require("./routes");

require("dotenv").config({ path: "./config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(require("./routes/project"));
configRoutes(app);

app.listen(4000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:4000");
});
