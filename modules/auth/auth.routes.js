const express = require("express");
const controllers = require("./auth.controllers");
const middlewares = require("../../middlewares");

const ROUTES = {
  signup: "/signup",
  login: "/login",
  logout: "/logout",
  isLoggedIn: "/login",
};

// this function recieves the app instance and attaches the auth routes to the router
// the signup and login controllers should only run if there is no user logged in
// the logout and isLoggedIn controllers should only run if there is a user in the session
function authRouter(app) {
  const router = express.Router();

  router
    .post(ROUTES.signup, middlewares.isNotLoggedIn, controllers.signup)
    .post(ROUTES.login, middlewares.isNotLoggedIn, controllers.login)
    .post(ROUTES.logout, middlewares.isLoggedIn, controllers.logout)
    .get(ROUTES.isLoggedIn, controllers.getLoggedInUser);

  app.use("/api", router);
}

module.exports = authRouter;
