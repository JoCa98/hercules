const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());

router.get('/getExerciseType', (req, res) => {
  connection.query("select * from view_seeexercisetypes", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });

});

router.get("/getExercise", (req, res) => {
  connection.query("CALL proc_seeExercisePerRoutine(" + req.query.routineID + "," + req.query.id + ")", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get("/getRoutineHistoric", (req, res) => {
  connection.query("CALL proc_seeRoutine(" + req.query.partyID + ")", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get("/getLastType", (req, res) => {
  connection.query("SELECT * FROM view_latestexercisetype", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });

});

router.get("/getRoutineInfo", (req,res) =>{
  connection.query("CALL proc_seeRoutineInfo(" + req.query.routineID + ")", function(err,results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get("/getAllExercises", (req, res) => {
  connection.query("CALL proc_getAllExercises(" + req.query.id + ")", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

module.exports = router;
