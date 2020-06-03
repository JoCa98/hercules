const mysql = require("mysql");


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hercules'
  })


  connection.connect(function(err){
    (err)? console.log(err): console.log(connection);
  })

  module.exports = connection;