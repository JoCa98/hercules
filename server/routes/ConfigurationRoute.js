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