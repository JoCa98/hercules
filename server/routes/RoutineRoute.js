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

module.exports = router;
