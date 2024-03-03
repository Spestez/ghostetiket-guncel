const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({
  databasePath: "./database/wio.db.js",
});
module.exports = db;

