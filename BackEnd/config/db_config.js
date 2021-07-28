'use strict';
//generer la connection vers la bdd 
const mysql = require('mysql');

//local mysql db connection
const ConnectToDb = mysql.createConnection({
  //doit etre protégé ! par des variables d'environements ou par des chiffrements 
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'argonautesdb'
});
ConnectToDb.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
//exporter la connection pour l'utiliser 
module.exports = ConnectToDb;