const Router = require("express").Router();
const projectsController = require("../controllers/projectsController");
const verifyTokenMiddleware = require("../middleware/middleware");

Router.post("/addProject", projectsController.addProject);
Router.get("/projects", verifyTokenMiddleware, projectsController.getAllProjects);
Router.put("/projects/:projectId/assign/:userId", projectsController.assignProject);
Router.put("/projects/:projectId/cancel", projectsController.cancelProject);
Router.get("/projects/assigned", verifyTokenMiddleware, projectsController.getAssignProjects);

module.exports = Router;