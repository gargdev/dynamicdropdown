require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Enable CORS

// Define your API routes here
const jsonData = require("./data.json");

app.get("/api/data", (req, res) => {
  res.json(jsonData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

