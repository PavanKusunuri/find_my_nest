const express = require("express");
const dotenv = require("dotenv");

// Load env Vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// Body parser
app.use(express.json());

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
