const express = require("express");
const taskRouter = require("./modules/task");
const authRouter = require("./modules/auth");
const filesRouter = require("./modules/files");
const { connectDb, middlewares, sessionConfig } = require("./config");

async function start() {
  try {
    const { PORT } = process.env;
    const app = express();
    // db
    await connectDb();
    // middlewares
    middlewares(app);
    sessionConfig(app);
    // routes
    authRouter(app);
    projectRouter(app);
    taskRouter(app);
    filesRouter(app);

    app.listen(PORT, () => console.log(`Server running at: ${PORT}`));
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = start;
