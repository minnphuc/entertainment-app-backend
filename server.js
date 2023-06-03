const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const app = require("./app");

// CONNECT TO DB
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log("Database is connected successfully 🛢️"))
  .catch(err => console.log(err));

// START THE SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));

console.log(process.env.NODE_ENV);
