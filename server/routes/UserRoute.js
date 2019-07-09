const connection = require('../database/connectionDB');
const express = require("express");
const router = express.Router();
var cors = require("cors");
router.use(cors());


//para diferenciar metodos post en las comillas de debe de poner el nombre
router.post('/addUser', function (req, res) {

  connection.query("CALL proc_addUser(" + req.body.identificationID + ",'" + req.body.firstName + "','" + req.body.secondName + 
                                            "','" + req.body.lastName + "','" + req.body.secondLastName + "','"+ req.body.carnet + 
                                            "','" + req.body.career + "','" + req.body.birthDate + "'," + req.body.genderID +
                                            "," + req.body.userTypeID + ",'" + req.body.email + "','" + req.body.password +
                                            "','" + req.body.startDate + "'," + req.body.districtID + ",'" + req.body.addressLine +
                                            "','" + req.body.contactName + "'," + req.body.relationTypeID + ",'" + req.body.emergencyContactPhonenumber +
                                            "','" + req.body.phoneNumber1 + "','" + req.body.phoneNumber2 +
                                            "')", function (err,result) {
      if (err) {
        return res.send(err)
      }
      else {
        return res.send(result)
      }
    })

});

router.post('/sendEmail', function (req, res) {

  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'emaildeprueba98@gmail.com',
      pass: 'Mate1998'
    }
  });

  var mailOptions = {
    from: 'emaildeprueba98@gmail.com',
    to: req.body.email,
    subject: 'Código de verificación',
    text: 'Código para confirmar registro: ' + req.body.activationCode
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

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

router.get('/getLocalGeoSupID', (req, res) => {
  connection.query("call proc_getLocalGeoSupID(" + req.query.localGeoSupID + ")", function (err, results) {
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
  connection.query("call proc_getCantons(" + req.query.pID + ")", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }

  });

});

router.get('/getDistricts', (req, res) => {
  connection.query("call proc_getDistricts(" + req.query.cID + ")", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }

  });

});

router.get('/isUserValid', (req, res) => {
  connection.query("Select fun_isUserValid('" + req.query.email + "','" + req.query.password +"') AS isUserValid", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }
  });
});

router.get('/getDataForLogin', (req, res) => {
  connection.query("call proc_getDataForLogin('" + req.query.email + "')", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }

  });

});

router.get('/getUserName', (req, res) => {
  connection.query("call proc_getUserName(" +  req.query.partyID +")", function (err, results) {
    if (results) {
      res.send(results);
    }
    else {
      console.log(err);
    }

  });
  
});

module.exports = router;