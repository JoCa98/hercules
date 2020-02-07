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
  connection.query("CALL proc_seeExercisePerRoutine(" + req.query.routineID + "," + req.query.id + "," + req.query.routineDay + ")", function (err, results) {
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

router.get("/getExerciseNumber", (req, res) => {
  connection.query("CALL proc_getExerciseNumber(" + req.query.typeID + ")", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get("/getRoutineType", (req, res) => {
  connection.query("SELECT * FROM view_rutinetype", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});


router.get("/getNumberOfDays", (req,res)=>{
  connection.query("call proc_numberOfRoutineDays(" + req.query.routineID + ")", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
})

router.get("/getObjetiveType", (req, res) => {
  connection.query("SELECT * FROM view_objetives", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get("/getRoutineID", (req, res) => {
  connection.query("call proc_getLastRoutineID(" + req.query.partyID + ")", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.post("/addRoutine", (req, res) => {
  connection.query("CALL proc_addRoutine(" + req.body.Frecuency + "," + req.body.Intensity + "," + req.body.RestTime +
  "," + req.body.Density + ",'" + req.body.date + "'," + req.body.partyID + "," + req.body.routineTypeID + "," + req.body.objectiveID + ",'" + req.body.HeartRatePerMinute + "')", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.post("/addExercise", (req, res) => {
  connection.query("CALL proc_addExercise(" + req.body.routineID + "," + req.body.exerciseID + "," + req.body.series +
  "," + req.body.repetitions + "," + req.body.charge + "," + req.body.minutes + "," + req.body.intensityPercentage + ",'" 
  + req.body.heartRate + "'," + req.body.routineDay + ")", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

module.exports = router;
