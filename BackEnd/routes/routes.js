//utilisation de router pour la creation des routes
const express = require('express')
//router est une instance de routes
const router = express.Router()
const ArgonauteController =   require('../controllers/controller');
// Read
// ArgonauteController.findAll est un callback ! si je met ArgonauteController.findAll() avec "()" elle sera appelé directement (ne sera plus un callback)
//.get prend en compte le path et une fonction callback "documentation d'express"
router.get('/', ArgonauteController.findAll);
// Create
router.post('/', ArgonauteController.create);
// Delete 
router.delete('/:id', ArgonauteController.delete);
//exporter le router 
module.exports = router