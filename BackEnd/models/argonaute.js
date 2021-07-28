"use strict";
//importer le module de connection vers la bdd
var ConnectToDb = require("../config/db_config");
//Fonction constructeur de l'argonaute
var Argonaute = function (argonaute) {
  this.first_name = argonaute.first_name;
  this.last_name = argonaute.last_name;
  this.age = argonaute.age;
  this.formation = argonaute.formation;
};
//les methodes du model argonaute
//la creation d'un argonaute : ajout d'un champ create qui est une fonction
//on aura deux arguments : l'argonaute et une fonction result
 // result est la callback fonction qui permet d'envoyer la réponse au client : est une fonction qui sera passé en argument pour qu'elle puisse s'executer apres
Argonaute.create = (argonaute, result) => {
//  "?" est repmplacé par  un objet ou une array
// "INSERT INTO argonautes set ?" <==>"  INSERT INTO argonautes SET first_name = "mon nom",  ect ... 
// INSERT INTO argonautes (first_name, ...) VALUES("Mon nom", ...)
 //query prend en compte l'argument argonaute et une fonction callback anoyme qui permet de detecter l'erreur lancé par query , recuperer le resultat via res 
 // on appel ce pattern : (err first callback pattern ou continuation passing style)
 //pour remplacer le "?" il faut mettre un array ou un objet "se trouve en documentation npm mysql"
 //il ya peut etre un risque de sql injection ! mais d'apres la documentation , utiliser "?" permet de "escape" la valeur d'entrée 
  ConnectToDb.query("INSERT INTO argonautes set ?", [argonaute], (err, res) => {
    if (err) {
  // result est le callback fonction qui permet d'envoyer la réponse au client 
      result(err, null);
    } else {
     // les champs de res : affectedRows: changedRows: fieldCount: insertId: message: protocol41: serverStatus: warningCount:
     // res.insertId = nouveau id inséré dans la table
      result(null, res.insertId);
    }
  });
};
//method find all
Argonaute.findAll = (result) => {
  ConnectToDb.query("Select * from argonautes", (err, res) => {
    if (err) {
      
      result(null, err);
    } else {
//res est un array d 'objets
      result(null, res);
    }
  });
};

Argonaute.delete = (id, result) => {
  // [id] ==> pour remplacer le "?" il faut mettre un array ou un objet "se trouve en documentation"
  ConnectToDb.query("DELETE FROM argonautes WHERE id = ?", [id], (err, res) => {
    if (err) {
     
      result(err);
    } else {
      //pour que l'erreur soit null
      result(null);
    }
  });
};
//exporter l'objet Argonaute avec tout ce qu'il a comme methods
module.exports = Argonaute;
