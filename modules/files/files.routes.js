// the fileUploader is the middleware in charge of parsing the request
// saving the file data into cloudinary and then attaching the url
// to the req object at req.file.path
// the ".single("imageUrl")" means that is a single file and it should be found in the imageUrl key of the request
const fileUploader = require("./files.config").single("imageUrl");
const express = require("express");
const controllers = require("./files.controllers");

const ROUTES = {
  uploadImage: "/image-upload",
};

function filesRouter(app) {
  const router = express.Router();

  router.post(ROUTES.uploadImage, fileUploader, controllers.updloadImage);

  app.use("/api", router);
}

module.exports = filesRouter;
