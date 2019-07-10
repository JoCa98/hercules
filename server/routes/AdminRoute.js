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
router.get('/getUsersByCarnet',  (req, res) => {
    connection.query("CALL proc_getUsersByCarnet('"+ req.query.carnet +"');", function(err,results){
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
  router.get('/getUsersByName',  (req, res) => {
    connection.query("CALL proc_getUsersByName('"+ req.query.name +"');", function(err,results){
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
  router.get('/getUsersByIdentification',  (req, res) => {
    connection.query("CALL proc_getUsersByIdentificationID('"+ req.query.identificationID +"');",
     function(err,results){
        if (results) {
            res.send(results);
          }
          else {
            console.log(err);
          }
    });
  });

module.exports = router;