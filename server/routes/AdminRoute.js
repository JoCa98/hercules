const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());


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