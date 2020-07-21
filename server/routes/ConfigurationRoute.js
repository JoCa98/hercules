const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());

//Careers
router.post('/AddCareer', (req, res) => {
  connection.query("CALL proc_addCareer('" + req.body.name + "');", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.post('/DeleteCareer', (req, res) => {
  connection.query("CALL proc_deleteCareer(" + req.body.careerID + ");", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get('/GetCareersWithoutStudents', (req, res) => {
  connection.query("CALL proc_getCareersWithoutStudents()", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.post('/UpdateCareerName', (req, res) => {
  connection.query("CALL proc_updateCareerName(" + req.body.careerID + ",'" + req.body.name + "');", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get('/GetCareers', (req, res) => {
  connection.query("CALL proc_getCareers();", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get('/GetCareerByID', (req, res) => {
  connection.query("CALL proc_getCareerByID(" + req.query.careerID + ");", function (err, results) {
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
  connection.query("CALL proc_getExerciseName('" + req.query.name + "');", function (err, results) {
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
  connection.query("CALL proc_getExercisesByType(" + req.query.type + ");", function (err, results) {
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
  connection.query("CALL proc_getExercisesByNameAndType(" + req.query.type + ",'" + req.query.name + "');", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.post('/AddNewExcercise', function (req, res) {
  connection.query("CALL proc_addNewExercise('" + req.body.name + "','"
    + req.body.link + "'," + req.body.typeID + "," + req.body.status + ");", function (err, results) {
      if (results) {
        res.send(results);
      }
      else {
        console.log(err);
      }
    });
});

router.post('/EditExcercise', function (req, res) {
  connection.query("CALL proc_updateExercise(" + req.body.exerciseID + ",'" + req.body.name + "','"
    + req.body.link + "'," + req.body.typeID + "," + req.body.status + ");", function (err, results) {
      if (results) {
        res.send(results);
      }
      else {
        console.log(err);
      }
    });
});

router.get('/getExerciseByID', (req, res) => {
  connection.query("CALL proc_getExerciseByID(" + req.query.exerciseID + ");", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.post('/changeExerciseStatus', (req, res) => {
  connection.query("CALL proc_changeExerciseStatus(" + req.body.exerciseID + "," + req.body.status + ");", function (err, results) {
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

//All users
router.get('/AdminAccounts', (req, res) => {
  connection.query("CALL proc_getAllGymAdmin()", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get('/MedicalAccounts', (req, res) => {
  connection.query("CALL proc_getAllMedicalAdmin()", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

//Specific state users
router.get('/ActiveMedics', (req, res) => {
  connection.query("CALL proc_getActiveMedics()", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get('/InactiveMedics', (req, res) => {
  connection.query("CALL proc_getInactiveMedics()", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get('/ActiveGymAdmins', (req, res) => {
  connection.query("CALL proc_getActiveGymAdmin()", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get('/InactiveActiveGymAdmins', (req, res) => {
  connection.query("CALL proc_getInactiveGymAdmins()", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

//Change status
router.get('/ChangeMedicStatus', (req, res) => {
  connection.query("CALL proc_changeMedicStatus('" + req.query.email + "'," + req.query.status + ")", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get('/DeleteAdmin', (req, res) => {
  connection.query("CALL proc_deleteAdmin('" + req.query.email + "')", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

//Risk conditons
router.post('/AddRiskCondition', (req, res) => {
  connection.query("CALL proc_addRiskCondition('" + req.body.description + "');", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.post('/DeleteRiskCondition', (req, res) => {
  connection.query("CALL proc_deleteRiskCondition(" + req.body.riskConditionID + ");", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get('/GetRiskConditionsWithoutStudents', (req, res) => {
  connection.query("CALL proc_getRiskConditionsWithoutStudents()", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

module.exports = router;

