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

const getJewelsForFilters = async ({
  precio_max,
  precio_min,
  categoria,
  metal,
}) => {
  try {
    let filtros = [];

    if (precio_min) filtros.push(`precio < ${precio_min}`);
    if (precio_max) filtros.push(`precio > ${precio_max}`);
    if (categoria) filtros.push(`categoria = '${categoria}'`);
    if (metal) filtros.push(`metal = '${metal}'`);
    let consulta = "SELECT * FROM inventario";
    if (filtros.length > 0) {
      filtros = filtros.join(" AND ");
      consulta += ` WHERE ${filtros}`;
      console.log(filtros);
    }
    const { rows: inventario } = await pool.query(consulta);
    return inventario;
  } catch {
    res
      .status(errorServer.status)
      .send({ status: errorServer.statusText, data: errorServer.text });
  }
};

module.exports = {
  getJewels,
  getJewelsForFilters,
};
