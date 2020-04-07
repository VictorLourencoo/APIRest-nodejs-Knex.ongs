// Update with your config settings.

//criar uma migration = npx knex migrate:make (nome da migration)

module.exports = {
  //ambiente de desenvolvimento, localhost
  development: {
    client: "postgresql",
    connection: {
      database: "HERO",
      user: "postgres",
      password: "ve9967bl",
      filename: "./src/database/db.postgres",
      //migrations:  criar tabelas e manter historico de tabelas, controle de versao do banco.
      //comando para criar a migration: npx knex migrate:make (nome)
    },
    migrations: {
      directory: "./src/database/migrations",
    },
  },
  //ambiente de produção para o time de desenvolvimento
  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  //ambiente de produçaõ, projeto online para clientes acessarem
  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },

    migrations: {
      tableName: "knex_migrations",
    },
  },
};
