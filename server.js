const express = require("express");
const connect = require("./config/db");
const authRouter = require("./routes/auth");
const notesRouter = require("./routes/notes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;

connect();

app.use(authRouter);
app.use(notesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
