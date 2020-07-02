const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());

//Reporte por estado de usuarios
router.get('/userStatusReport', (req, res) => {
    connection.query("CALL proc_userStatusReport(" + req.query.selectedStatus + ");", function (err, results) {
      if (results) {
        res.send(results);
      }
      else {
        console.log(err);
      }
    });
  });

  //Reporte por género de los usuarios
  router.get('/userGenderReport', (req, res) => {
    connection.query("CALL proc_genderReport(" + req.query.selectedGender + ");", function (err, results) {
      if (results) {
        res.send(results);
      }
      else {
        console.log(err);
      }
    });
  });

  //Reporte por carrera de los usuarios
  router.get('/userCareerReport', (req, res) => {
    connection.query("CALL proc_careerReport(" + req.query.selectedCareer + ");", function (err, results) {
      if (results) {
        res.send(results);
      }
      else {
        console.log(err);
      }
    });
  });

  //Reporte por año de ingreso de los usuarios
  router.get('/userYearReport', (req, res) => {
    connection.query("CALL proc_startDateReport(" + req.query.selectedYear + ");", function (err, results) {
      if (results) {
        res.send(results);
      }
      else {
        console.log(err);
      }
    });
  });

  //Reporte por condición de riesgo
  router.get('/userRiskReport', (req, res) => {
    connection.query("CALL proc_riskConditionReport(" + req.query.selectedRisk + ");", function (err, results) {
      if (results) {
        res.send(results);
      }
      else {
        console.log(err);
      }
    });
  });

  //Reporte por tipo de usuario
  router.get('/userTypeReport', (req, res) => {
    connection.query("CALL proc_userType(" + req.query.selectedType + ");", function (err, results) {
      if (results) {
        res.send(results);
      }
      else {
        console.log(err);
      }
    });
  });

  //Reporte por tipo de rutina
  router.get('/userRoutineTypeReport', (req, res) => {
    connection.query("CALL proc_routineTypeReport(" + req.query.selectedRoutine + ");", function (err, results) {
      if (results) {
        res.send(results);
      }
      else {
        console.log(err);
      }
    });
  });

  router.get('/signUpDates', (req, res) => {
    connection.query("CALL proc_getSignUpYears();", function (err, results) {
      if (results) {
        res.send(results);
      }
      else {
        console.log(err);
      }
    });
  });

module.exports = router;