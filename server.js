const express = require("express");
const dotenv = require("dotenv");

// Route files
const users = require("./routes/user");

// Load env Vars
dotenv.config({ path: "./config/config.env" });

const app = express();

//  Mount routers
app.use("/api/v1/users", users);

// Body parser
app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
