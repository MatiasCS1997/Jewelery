const pool = require("../helpers/database");
const format = require("pg-format");
const { errorServer } = require("../helpers/validations");

const getJewels = async ({ limits = 6, order_by = "stock_ASC", page = 1 }) => {
  try {
    const [campo, direccion] = order_by.split("_");
    const offset = (page - 1) * limits;
    const formattedQuery = format(
      "SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s",
      campo,
      direccion,
      limits,
      offset
    );
    const { rows: inventario } = await pool.query(formattedQuery);
    return inventario;
  } catch (errorServer) {
    throw res
      .status(errorServer.status)
      .send({ status: errorServer.statusText, data: errorServer.text });
  }
};

