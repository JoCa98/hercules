const express = require("express");
const cors = require("cors");
const router = express.Router();

process.env.SECRET_KEY = "secret";

router.use(cors());

router.get('/', function (req, res) {
    connection.query('CALL proc_addMedicalInfo', req.body)
    .then(result => res.json(result))  
  // console.log("llegó")
});

//connection.query('CALL proc_addMedicalInfo'+ req.body, function (err, results) {
//  if(err){
//    return res.send(err)
// }
// else{
//   return res.send('hecho')
// .then(result => res.json(result))
// }
//});
module.exports = router;
