const mysql = require("mysql");


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hercules'
  })


  connection.connect(function(err){
    (err)? console.log(err): console.log(connection);
  })

  module.exports = connection;