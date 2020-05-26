const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());

router.post('/AddCareer',(req,res) => {
    connection.query("CALL proc_AddCareer('" + req.body.name + "');", function(err, results) {
        if (results) {
            res.send(results);
          }
          else {
            console.log(err);
          }
    });
});

//Ejercicios
router.post('/AddExcercise',(req,res) => {
  connection.query("CALL proc_addNewExercise('" + req.body.exerciseDescription + "','" + req.body.exerciseLink + "'," + req.body.exerciseTypeID + ");", function(err, results) {
      if (results) {
          res.send(results);
        }
        else {
          console.log(err);
        }
  });
});

router.post('/EditExcercise',(req,res) => {
  connection.query("CALL proc_updateExercise('" + req.body.exerciseID + "','" + req.body.exerciseDescription + "','" + req.body.exerciseLink + "'," + req.body.exerciseTypeID + ");", function(err, results) {
      if (results) {
          res.send(results);
        }
        else {
          console.log(err);
        }
  });
});

router.post('/ExerciseStatus',(req,res) =>{
  connection.query("CALL proc_changeExerciseStatus(" + req.body.exerciseID + "," + req.body.status + ");", function(err,results){
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

//Cuentas
router.get('/isMasterEmail', (req, res) => {
  connection.query("Select fun_verifyMasterAdmin('" + req.query.email + "') AS masterEmail", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get('/AdminAccounts', (req, res) => {
  connection.query("CALL proc_getAllGymAdmin()", function (err,results){
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
 });
});

router.get('/MedicalAccounts', (req, res) => {
  connection.query("CALL proc_getAllMedicalAdmin()", function (err,results){
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
 });
});