const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());


//para diferenciar metodos post en las comillas de debe de poner el nombre
router.post('/addUser', function (req, res) {

  {}

});
router.get('/getRelationType', (req, res) => {
  connection.query("select * from view_relationship", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get('/getProvinces', (req, res) => {
  connection.query("select * from view_provinces", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get('/getCantons', (req, res) => {
  connection.query("call proc_getCantons("  + req.params.provinceID  + ")", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }

  });
  
});

module.exports = router;