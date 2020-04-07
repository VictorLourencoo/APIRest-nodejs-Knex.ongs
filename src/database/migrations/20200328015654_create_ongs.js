//documentação do knex: schema build


exports.up = function(knex) {
  //criando uma tabela
  return Promise.all([
  knex.schema.createTable('ongs', function(table){
         //criando colunas
         table.string('id').primary();
         table.string('name').notNullable();
         table.string('email').notNullable();
         table.string('whatsApp').notNullable();
         table.string('city').notNullable();
         table.string('uf', 2).notNullable();
         
  })
])
  
};
exports.down = function(knex) {
  //deletar uma tabela
  return Promise.all([
   knex.schema.dropTable('ongs')
  ])
};
//executar migrations: npx knex migrate:latest