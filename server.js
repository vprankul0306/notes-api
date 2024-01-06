const express = require("express");
const connect = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

connect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
