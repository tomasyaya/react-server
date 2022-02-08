// index.js file is to re export the main module functionallity
// this allows you to import like  ./task and not ./task/task.routes.js
const taskRouter = require("./task.routes");

module.exports = taskRouter;
