const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./dbConnect");
const serverless = require("serverless-http"); // Import serverless-http
const app = express();

const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dbConnect();

app.use("/", require("./route/todoRoute"));

// Export the handler for AWS Lambda
module.exports.handler = serverless(app);
