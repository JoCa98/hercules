const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const app = express();
// Settings
app.set("port", process.env.PORT || 8080);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes

//APP USE LOGIN


// Static Files
app.use(express.static("dist"));
//app.use(express.static(path.join(__dirname, '../../public')));

module.exports = app;
