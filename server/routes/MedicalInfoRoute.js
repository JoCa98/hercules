const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());


//para diferenciar metodos post en las comillas de debe de poner el nombre
router.post('/addMedicalInfo', function (req, res) {

  connection.query("CALL proc_addMedicalInfo(" + req.body.partyID + ",'" + req.body.date + "','" + req.body.pathologies + "','" + req.body.allergies + "','" + req.body.surgeries +
    "'," + req.body.traumas + "," + req.body.smoking + ",'" + req.body.neurologicalInfo + "','" + req.body.pulmonaryCardioInfo + "','" + req.body.bloodPressure +
    "'," + req.body.heartRate + "," + req.body.aerobicThreshold + "," + req.body.SpO2 + "," + req.body.weight + "," +
    req.body.size + "," + req.body.IMC + "," + req.body.waist + "," + req.body.hip + "," + req.body.cardiovascularRisk + ",'" + req.body.recommendations + "'" + ",'" + req.body.medicalCod + "','" + req.body.upToDate + "')", function (err, result) {
      if (err) {
        return res.send(err)
      }
      else {
        return res.send(result)
      }
    }
  )

});

router.get('/getMedicalInfoHist', (req, res) => {
  connection.query("CALL proc_getMedicalInfoByPartyID(" + req.query.partyID + ");", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  }
  )
});

/**
  *Method to execute the procedure stored in the database
  *to obtain the all data of medical info of the users 
  *but in spanish
  * 
  * @param {Request}
  * @param {Response}
*/
router.get('/getMedicalInfoByIDSpanish', (req, res) => {
  connection.query("CALL proc_getMedicalInfoByPartyIDSpanishVersion(" + req.query.partyID + ");", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  }
  )
});

router.get('/getMedicalCod', (req, res) => {
  connection.query("CALL proc_getMedicalCod(" + req.query.partyID + ");", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  }
  )
});

router.post('/updateMedicalRegister', (req,res) => {
  connection.query("CALL proc_updateMedicalInfo("+ req.body.medicalID +  ",'" + req.body.date + "','" + req.body.pathologies + "','" + req.body.allergies + "','" + req.body.surgeries +
  "'," + req.body.traumas + "," + req.body.smoking + ",'" + req.body.neurologicalInfo + "','" + req.body.pulmonaryCardioInfo + "','" + req.body.bloodPressure +
  "'," + req.body.heartRate + "," + req.body.aerobicThreshold + "," + req.body.SpO2 + "," + req.body.weight + "," +
  req.body.size + "," + req.body.IMC + "," + req.body.waist + "," + req.body.hip + "," + req.body.cardiovascularRisk + ",'" + req.body.recommendations + "','" + req.body.upToDate + "')", function (err, result) {
    if (err) {
      return res.send(err)
    }
    else {
      return res.send(result)
    }
  });
});

module.exports = router;