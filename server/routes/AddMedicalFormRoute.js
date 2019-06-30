const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());


//para diferenciar metodos post en las comillas de debe de poner el nombre
router.post('/', function (req, res) {

  connection.query("CALL proc_addMedicalInfo(" + req.body.partyID + ",'" + req.body.date + "','" + req.body.pathologies + "','" + req.body.allergies + "','" + req.body.surgeries +
    "'," + req.body.traumas + "," + req.body.smoking + ",'" + req.body.neurologicalInfo + "','" + req.body.pulmonaryCardioInfo + "'," + req.body.bloodPressure +
    "," + req.body.heartRate + "," + req.body.heartRatePerMinute + "," + req.body.SpO2 + "," + req.body.weight + "," +
    req.body.size + "," + req.body.IMC + "," + req.body.abdomen + "," + req.body.waist + "," + req.body.hip + ")", function (err,result) {
      if (err) {
        return res.send(err)
      }
      else {
        return res.send(result)
      }
    })

});

module.exports = router;