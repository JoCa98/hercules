const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());

router.get('/getExerciseType', (req, res) => {
  connection.query("select * from view_seeexercisetypes", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });

});

module.exports = router;
