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

router.post('/AddExcercise',(req,res) => {
  connection.query("CALL proc_addNewExercise('" + req.body.exerciseDescription + "','" + req.body.imagePath + "','" + req.body.exerciseLink + "','" + req.body.exerciseTypeID + "');", function(err, results) {
      if (results) {
          res.send(results);
        }
        else {
          console.log(err);
        }
  });
});

router.post('/EditExcercise',(req,res) => {
  connection.query("CALL proc_updateExercise('" + req.body.exerciseID + "','" + req.body.exerciseDescription + "','" + req.body.exerciseLink + "','" + req.body.exerciseTypeID + "');", function(err, results) {
      if (results) {
          res.send(results);
        }
        else {
          console.log(err);
        }
  });
});

module.exports = router;