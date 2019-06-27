const mysql = require(mysql);
const router = express.Router();


router.use(cors());

module.exports = function (app) {

    app.post('/add', function (req, res) {
        connection.query('CALL proc_addMedicalInfo', function (err, results) {
           if(err){
               return res.send(err)
           }
           else{
               return res.send('hecho')
           }
        });

    })

};

module.exports = router;
