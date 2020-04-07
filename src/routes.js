  
const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionControlller = require('./controllers/SessionController');

const routes= express.Router();


//login
routes.post('/sessions', SessionControlller.create);



//cadastrar uma ong;
routes.post('/ongs', OngController.create);
 
routes.get('/ongs',OngController.index);

//cadastrar um incidente
routes.post('/incidents', IncidentsController.create);
//listar incidents
routes.get('/incidents', IncidentsController.index);
//deletar incidents
routes.delete('/incidents/:id', IncidentsController.delete);
// listar um incidente especifico (perfil);

routes.get('/profile', ProfileController.index);



module.exports = routes;