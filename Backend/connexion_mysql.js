const mysql = require("mysql");

const connectionDB = mysql.createConnection({
    host     : process.env.DB_host,
    user     : process.env.DB_user,
    password : process.env.DB_password,
    database : process.env.DB_database
  });
  
  connectionDB.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log("Connecté à la base de données MySQL!");
  });
  
  module.exports = connectionDB;