const express = require("express");
const path = require('path');
const app = express();

const api = require("./routes/api");

app.use(express.json());
/**/app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use("/", api);
/**/app.get("*", (request, response) => {
/**/  response.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
/**/});
module.exports = app;
