const Router = require("express").Router();
const formController = require("../controllers/formController");
Router.post("/addData", formController.add);
Router.get("/getData", formController.read);
Router.patch("/updateData/:id", formController.edit);
Router.delete("/deleteData/:id", formController.delete);

module.exports = Router;
