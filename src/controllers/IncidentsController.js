/* O indicente pertence a uma determina ong, onde sera registrada atraves da 
chave estrangeira (ong_id) que sera passada dentro do cabeçalho da requisao, em 
(authorization)*/

const connection = require("../database/connection");
module.exports = {
  //metodo indx faz a listagem do incidents que pertencem a uma determina ong logada.
  async index(request, response) {
    //paginação

    const { page = 1 } = request.query;

    //contando total de casos
    const [count] = await connection("incidents_ongs").count();
    console.log(count);

    const incidents_ongs = await connection("incidents_ongs")
      //unindo a tabela ong e incidents.
      .join("ongs", "ongs.id", "=", "incidents_ongs.ong_id")
      //definindo um limite de incidents por  pagina
      .limit(5)
      //as paginas a partir da segundo terãp que ser puladas de 5 em 5, menos na 1°
      //na primeira pula 0 / (1 - 1) * 5 = 0/ 2° (2 - 1) * 5 = 5 pula 5 paginas e assim em diante
      .offset((page - 1) * 5)
      .select(
        "incidents_ongs.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsApp",
        "ongs.city",
        "ongs.uf"
      );

    response.header("X-Total-Count", count["count(*)"]);

    return response.json(incidents_ongs);
  },

  //metodo cria um incidente de acordo com a ong logada, (id incremental) ong_id = o id da onf logada;
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;
    //cabeçaçho da requisição, onde guarda infomações sobre o contexto,informaçao do usuario, localização da requisição,
    //no cabeçalho  ira conter o ong_id(qual ong pertence o incidente)

    const id = await connection("incidents_ongs").insert({
      title,
      description,
      value,
      ong_id,
    });

    return response.json(title);
  },

  //deleta uma determinada ong que foi passada, de acordo com o id dela
  async delete(request, response) {
    //acessar resursos da rota que foi enviada, ou seja (id)
    const { id } = request.params;
    // pega o ong_id que esta no cabeçalho da ong que esta sendo enviada
    const ong_id = request.headers.authorization;
    // o id passado no parametro tem que ser igual ao que esta no banco, ou seja busca

    const incidents = await connection("incidents_ongs")
      .where("id", id)
      .select("ong_id")
      .first();
    //dps de encontrar a tupla pega o Ong_id dela e comparada com o id que esta no cabeçalho do pacote
    //necessario verificar para confirmar se o incident pertence a determina ong
    if (incidents.ong_id != ong_id) {
      //caso seja diferente nao pode ser apagado por esta ong
      return response.status(401).json({ error: "Operation not permitted." });
    }
    //caso seja igual sera deletado e ira retornar um 204.
    await connection("incidents_ongs").where("id", id).delete();
    return response.status(204).send();
  },
};
