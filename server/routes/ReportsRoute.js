const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());


router.get('/userStatusReport', (req, res) => {
    connection.query("CALL proc_userStatusReport(" + req.query.selectedStatus + ");", function (err, results) {
      if (results) {
        res.send(results);
      }
      else {
        console.log(err);
      }
    });
  });


module.exports = router;