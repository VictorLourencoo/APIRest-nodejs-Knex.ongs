const connection = require("../database/connection");
//buscar uma so incidente em uma determina ong.
module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incidents = await connection("incidents_ongs")
      .where("ong_id", ong_id)
      .select("*");

    return response.json(incidents);
  },
};
