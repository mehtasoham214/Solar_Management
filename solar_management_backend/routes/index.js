const projectRoutes = require("./project");

const constructorMethod = (app) => {
    app.use("/", projectRoutes);

    app.use("*", async (req, res) => {
        res.status(404).json({ error: "Page Not found!" });
    });
};

module.exports = constructorMethod;
