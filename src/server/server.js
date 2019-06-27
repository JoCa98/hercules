const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
//base de datos = cambio Ester
const mysql = require("mysql");
// fin cambio ester

const app = express();
// Settings
app.set("port", process.env.PORT || 8080 || 3000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cambio ester
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'DURABRITE22ester.',
    database: 'hercules'
})

connection.connect(function(err){
    (err)? console.log(err): console.log(connection);
})
//cambio ester

// Routes
//cambio ester

app.use('/add',require('../routes/AddMedicalFormRoute'));
//cambio ester

//APP USE LOGIN


// Static Files
app.use(express.static("dist"));
//app.use(express.static(path.join(__dirname, '../../public')));

module.exports = app;
