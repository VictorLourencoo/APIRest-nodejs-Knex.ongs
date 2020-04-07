const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  async index(request, response) {
    const ongs = await connection("ongs").select("*");

    return response.json(ongs);
  },

  async create(request, response) {
    //Desestruturando o body, para armazenar cada info em uma variavel;
    const { name, email, whatsApp, city, uf } = request.body;

    //criar id da ong com o pacote crypto
    //criando um id aleatorio de 4 caracteres e converter para uma string hexadecimal
    const id = crypto.randomBytes(4).toString("HEX");

    //inserindo dados ao banco de dados
    await connection("ongs").insert({
      id,
      name,
      email,
      whatsApp,
      city,
      uf,
    });

    //async e (await = aguarde) node so segue no codigo dps que o insert for finalizado

    //so ira ser retornado o id, id servira para se conectar ao sistema.
    return response.json({ id });
  },
};
