const express = require('express');
// creation d'une app express
const app = express();
// set le port si le port n'existe pas dans la variable d'environement (que je n'ai pas créé) , elle prend 4000 comme port par defaut
const port = process.env.PORT || 4000;
//pour traiter les requetes/reponses objects en format json
app.use(express.json());
//lire urlencoded : TJRRR LE FAIRE SINON ON AURA RIEN DANS LE REQ DE POST
//pour traiter les requetes/reponses objects en format array ou string
app.use(express.urlencoded({ extended: "false" }));
// define a root route : afficher quelque chose lorsqu'on entre en url :  localhost:4000
app.get('/', (req, res) => {
  res.send("Hello World");
});

const ArgonautesRoutes = require('./routes/routes')
//utilise cette route comme route ROOT (principale) dont les Routes du module ArgonautesRoutes vont utilisé comme point de depart
// creation du prefix puis attaché toutes les routes (endpoints ) à ce prefixe
//app.use permet de liée "bind" un path au routes
app.use('/api/v1/argonautes', ArgonautesRoutes)
// entendre le port 
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
