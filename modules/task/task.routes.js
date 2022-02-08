const controllers = require("./task.controllers");
const ROUTES = require("./task.constants");
const express = require("express");

const middlewares = require("../../middlewares");

// all of this routes should be private, if there is no user in the session then you should not allowed to access them
function taskRouter(app) {
  const router = express.Router();

  router
    .get(ROUTES.getTasks, middlewares.isLoggedIn, controllers.getTasks)
    .get(ROUTES.getTaskById, middlewares.isLoggedIn, controllers.getTaskById)
    .post(ROUTES.createTask, middlewares.isLoggedIn, controllers.createTask)
    .put(ROUTES.updateTask, middlewares.isLoggedIn, controllers.updateTask)
    .delete(ROUTES.deleteTask, middlewares.isLoggedIn, controllers.deleteTask);

  app.use("/api", router);
}

module.exports = taskRouter;
