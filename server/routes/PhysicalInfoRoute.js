const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());


//para diferenciar metodos post en las comillas de debe de poner el nombre
router.post('/addPhysicalInfo', function (req, res) {

  connection.query("CALL proc_addPhysicalInfo(" + req.body.partyID + ",'" + req.body.date + "'," + req.body.weight + 
                                            "," + req.body.bodyWater + ","+ req.body.boneMass + 
                                            "," + req.body.DCI + "," + req.body.metabolicAge + "," + req.body.totalBodyFat +
                                            "," + req.body.muscleMass + "," + req.body.physicalAssesment + "," + req.body.viceralFat +
                                             ")", function (err,result) {
      if (err) {
        return res.send(err)
      }
      else {
        return res.send(result)
      }
    })

});

/**
  *Method to execute the procedure stored in the database
  *to obtain the all data of physical info of the users 
  * 
  * @param {Request}
  * @param {Response}
*/
router.get('/getPhysicalInfoByID',  (req, res) => {
  connection.query("CALL proc_getPhysicalInfoByPartyID('"+ req.query.partyID +"');",
   function(err,results){
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
  *to obtain the all data of physical info of the users 
  *but in spanish
  * 
  * @param {Request}
  * @param {Response}
*/
router.get('/getPhysicalInfoByIDSpanish',  (req, res) => {
  connection.query("CALL proc_getPhysicalInfoByPartyIDSpanishVersion('"+ req.query.partyID +"');",
   function(err,results){
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
  *to obtain the last data of physical info of the users 
  * Just charge one registre
  * @param {Request}
  * @param {Response}
*/
router.get('/getOnePhysicalInfoByID',  (req, res) => {
  connection.query("CALL proc_getOnePhysicalInfoByPartyID('"+ req.query.partyID +"');",
   function(err,results){
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
  *to update physical information
  * @param {Request}
  * @param {Response}
*/
router.post('/updatePhysicalInfo', function (req, res) {

  connection.query("CALL proc_updatePhysicalInfo(" + req.body.idPhysicalInfo + "," + req.body.weight + 
                                            "," + req.body.bodyWater + ","+ req.body.boneMass + 
                                            "," + req.body.DCI + "," + req.body.metabolicAge + "," + req.body.totalBodyFat +
                                            "," + req.body.muscleMass + "," + req.body.physicalAssesment + "," + req.body.visceralFat +
                                             ")", function (err,result) {
      if (err) {
        return res.send(err)
      }
      else {
        return res.send(result)
      }
    })

});

module.exports = router;