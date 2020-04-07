const express = require('express');

const routes = require('./routes');

const cors = require('cors');
//definição de rotas

const app = express();
//definir que sera usado json
//modulo de segurança cors = determina que vai poder acessar a aplicação 
app.use(cors(
  //{
  //origin: qual endereço podera acessar a aplicação 
//}
));
app.use(express.json());
app.use(routes);



//requeste.query = para ter acesso as querys passadas na requisição
  //requeste.params = para ter acesso aos recurso do router params na requisição
  //requeste.body = todos os parametros da requisição



//query params : parametros nomeados enviados na rota apos "?" (filtros, paginação)
//router params: parametros ultilizados pra indentificar recursos
//request Body: corpo da requisição, ultilizado para criar ou alterar recursos
//exemplos de parametros
//querys: users?name=victor&idade=19
//router: users/:id


//porta
app.listen(3333);
