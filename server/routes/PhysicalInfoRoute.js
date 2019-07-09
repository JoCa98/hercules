const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());


//para diferenciar metodos post en las comillas de debe de poner el nombre
router.post('/addPhysicalInfo', function (req, res) {

  connection.query("CALL proc_addPhysicalInfo(" + req.body.partyID + ",'" + req.body.date + "'," + req.body.weight + 
                                            "," + req.body.aerobicThreshold + "," + req.body.bodyWater + ","+ req.body.boneMass + 
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
  *to obtain the data of physical info of the users 
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

module.exports = router;