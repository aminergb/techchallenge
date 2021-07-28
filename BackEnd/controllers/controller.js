"use strict";
//importer le module argonaute
const Argonaute = require("../models/argonaute");
//exporter methode par methode
exports.findAll = (req, res) => {
  Argonaute.findAll((err, argonautes) => {
    
    if (err) res.send(err);
    //console.log("res", Argonaute);
    else
     //la difference entre send et json : json permet d'abord de convertir le field en un objet json puis appel send pour l'envoyer
     //argonautes == array d'objets qu'on va envoyer au front (le map() se fait via une array ! )
    res.json(argonautes);
  });
};
exports.create = (req, res) => {
  const new_argonaute = new Argonaute(req.body);
  //console.log(new_argonaute)
  //permet de savoir si la requete est un objet et si elle est vide (pas de champs "no keys")
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //res va envoyé un status 400 bad request et avec un objet 
    res.status(400)
      .json({ message: "Veuillez remplir tout les champs !!!" });
  } else {
    Argonaute.create(new_argonaute, (err, argonaute) => {
      //la difference entre send et json : json permet d'abord de convertir le field en un objet json puis appel send pour l'envoyer
      if (err) res.send(err);
      else{  res.json({
        message: "Argonaute "+argonaute.first_name+" à été bien ajouté ",
       
      });
    }
    
    });
  }
};
//exporter delete
exports.delete = (req, res) => {
  // pour delete : on prend l'id de la requete qui se trouve dans req.params.id
  Argonaute.delete(req.params.id, (err) => {
    if (err) res.send(err);
    else{ res.json({  message: "Argonaute Numéro "+req.params.id+" à été bien supprimé" });}
   
  });
};
