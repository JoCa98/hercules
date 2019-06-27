const mysql = require(mysql);
const router = express.Router();


router.use(cors());

module.exports = function(app) {

    app.post('AddMedicalFormRoute/add', function(req, res)
    { console.log(req.body);
        res.send('works');
       
       })
   
};

module.exports = router;
//connection.query('CALL proc_addMedicalInfo', function(err, data){
 ///   (err)?res.send(err):res.json({users:data})
//});