const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());

router.post('/', function (req, res) {

  connection.query('insert into medical_info SET idMedical_Info=?, date=?, pathologies=?, allergies=?, surgeries=?, traumas=?, smoking=?, neurologicalInfo=?, pulmonaryCardioInfo=?, bloodPressure=?, heartRate=?, heartRatePerMinute=?, SpO2=?, partyID=?, weight=?, size=?, IMC=?, abdomen=?, waist=?, hip=?'
  ,[2,'1998-08-22','a','b','c',1,1,'d','e', 100, 20, 20, 2, 1, 40, 160, 15, 90, 60, 70]);

  //,[1,req.body.date, req.body.pathologies, req.body.allergies, req.body.surgerie, req.body.traumas, req.body.smoking,
  //req.body.neurologicalInfo, req.body.pulmonaryCardioInfo, req.body.bloodPressure, req.bosy.heartRate, req.body.heartRatePerMinute,
  //req.body.SpO2, req.body.partyID,req.body.weight, req.body.size, req.body.IMC, req.abdomen, req.body.waist, req.body.hip]);

    console.log('Insertado')

});

module.exports = router;
