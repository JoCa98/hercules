/**
 * @fileoverview AdminRoute, contains the methods to call 
 * the different data use of admin user will need
 *
 * @version 1.0
 *
 * @author    José Carlos Chávez Moran <jose.chavez@ucrso.info>
 * History
 * v1.0 – Initial Release
 * ----
 * The first version of AdminRoute was written by José Chávez.
 */
const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());

/**
 *Method to execute the procedure stored in the database
 *to obtain the data of the users using the card as a search criterion
 * 
 * @param {Request}
 * @param {Response}
*/
router.get('/getUsersByCarnet', (req, res) => {
  connection.query("CALL proc_getUsersByCarnet('" + req.query.carnet + "');", function (err, results) {
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
  *to obtain the data of the users using the name as a search criterion
  * 
  * @param {Request}
  * @param {Response}
*/
router.get('/getUsersByName', (req, res) => {
  connection.query("CALL proc_getUsersByName('" + req.query.name + "');", function (err, results) {
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
  *to obtain the data of the users using the identificationID as a search criterion
  * 
  * @param {Request}
  * @param {Response}
*/
router.get('/getUsersByIdentification', (req, res) => {
  connection.query("CALL proc_getUsersByIdentificationID(" + req.query.identificationID + ");",
    function (err, results) {
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
*to create a new administer
* 
* @param {Request}
* @param {Response}
*/
router.post('/addAdmin', (req, res) => {
  connection.query("CALL proc_addAdmin(" + req.body.userTypeID + "," + req.body.identificationID + ",'" + req.body.firstName
    + "','" + req.body.secondName + "','" + req.body.firstLastName + "','" + req.body.secondLastName + "','" + req.body.email
    + "','" + req.body.password + "','" + req.body.medicalCod + "');", function (err, results) {
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
*to update the password of a specific admin
* 
* @param {Request}
* @param {Response}
*/
router.post('/updateAdminPassword', function (req, res) {  
  connection.query("CALL proc_updateAdminPassword(" + req.body.partyID + ",'" + req.body.password + "')", function (err, results) {
      if (results) {
        res.send(results);
      }
      else {
        console.log(err);
      }
    });
});


/**
  *Get admin user type for the AddAdmin form
  * 
  * @param {Request}
  * @param {Response}
*/
router.get('/getAdminUserType', (req, res) => {
  connection.query("CALL proc_getAdminUserType();",
    function (err, results) {
      if (results) {
        res.send(results);
      }
      else {
        console.log(err);
      }
    });
});

module.exports = router;