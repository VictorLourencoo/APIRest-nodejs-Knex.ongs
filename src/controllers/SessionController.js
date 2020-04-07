const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection("ongs")
      .where("id", id)
      .select("name") //retornar so o nome dele
      .first(); //nao retornar um array e sim um resultado

    if (!ong) {
      return response.status(400).json({ error: "NO ONG FOUND WITH THIS ID" });
    }
    return response.json(ong);
  },
};
