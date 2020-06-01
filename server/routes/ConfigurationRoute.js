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


/**
 *Method to execute the procedure stored in the database
 *to obtain the data of the users using the card as a search criterion
 * 
 * @param {Request}
 * @param {Response}
*/
router.get('/getExercisesListOrderType', (req, res) => {
  connection.query("CALL proc_getExercisesListOrderType();", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});


/**
 *Method to execute the procedure stored in the database
 *to obtain the data of the users using the card as a search criterion
 * 
 * @param {Request}
 * @param {Response}
*/
router.get('/getExerciseType', (req, res) => {
  connection.query("CALL proc_getExerciseType();", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});


/**
 *Method to execute the procedure stored in the database
 *to obtain the data of the users using the card as a search criterion
 * 
 * @param {Request}
 * @param {Response}
*/
router.get('/getExerciseName', (req, res) => {
  connection.query("CALL proc_getExerciseName();", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});


/**
 *Method to execute the procedure stored in the database
 *to obtain the data of the users using the card as a search criterion
 * 
 * @param {Request}
 * @param {Response}
*/
router.get('/getExercisesByType', (req, res) => {
  connection.query("CALL proc_getExercisesByType();", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});



/**
 *Method to execute the procedure stored in the database
 *to obtain the data of the users using the card as a search criterion
 * 
 * @param {Request}
 * @param {Response}
*/
router.get('/getExercisesByNameAndType', (req, res) => {
  connection.query("CALL proc_getExercisesByNameAndType();", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

module.exports = router;

