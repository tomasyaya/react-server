const express = require("express");
const cors = require("cors");

const { ORIGIN } = process.env;

function middlewares(app) {
  try {
    // allows to process json request
    app.use(express.json());
    // allows to process all form data
    app.use(express.urlencoded({ extended: true }));
    // cors middleware is to allow request comming from a diferent url than the one hosting the server
    app.use(cors({ credentials: true, origin: ORIGIN }));
  } catch (err) {
    console.log("error", err.message);
  }
}

module.exports = middlewares;
