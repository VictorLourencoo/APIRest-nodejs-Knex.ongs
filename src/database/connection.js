const knex = require("knex");
const configuration = require("../../knexfile");

//configurando conexao com o banco
//criando a conexao com o banco e passando a configuração de desenvolvimento
const connection = knex(configuration.development);

module.exports = connection;

//BANCO DE DADOS
//DRIVER: Select * from users
//mais recomendado, melhor flexibilidade.
//KNEX.JS
//QUERY BUIDER: table('users').select('*').where()
