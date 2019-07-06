const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());


router.get('/getUsersByCarnet',  (req, res) => {
    connection.query("CALL proc_getUsersByCarnet('');", function(err,results){
        if (results) {
            res.send(results);
          }
          else {
            console.log(err);
          }
    });
  
  });

module.exports = router;