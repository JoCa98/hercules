const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());


//para diferenciar metodos post en las comillas de debe de poner el nombre
router.post('/', function (req, res) {

  connection.query("insert into medical_info(date, pathologies, allergies, surgeries, traumas,"
    + "smoking, neurologicalInfo, pulmonaryCardioInfo, bloodPressure, heartRate, heartRatePerMinute, SpO2, partyID,"
    + "weight, size, IMC, abdomen, waist, hip) values('" + req.body.date + "','" + req.body.pathologies + "','" + req.body.allergies + "','" + req.body.surgeries +
    "'," + req.body.traumas + "," + req.body.smoking + ",'" + req.body.neurologicalInfo + "','" + req.body.pulmonaryCardioInfo + "'," + req.body.bloodPressure +
    "," + req.body.heartRate + "," + req.body.heartRatePerMinute + "," + req.body.SpO2 + "," + req.body.partyID +
    "," + req.body.weight + "," + req.body.size + "," + req.body.IMC + "," + req.body.abdomen + "," + req.body.waist + "," + req.body.hip + ");")

  console.log('Insertado')

});

module.exports = router;
