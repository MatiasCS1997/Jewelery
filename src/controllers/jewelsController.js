const { getJewels, getJewelsForFilters } = require("../models/jewelsModel");
const {
  errorServer,
  filtersNotFoundError,
  priceIsNotNumericError,
} = require("../helpers/validations");

// Filtrado de registros en una consulta

const getJewelsForFilters = async (req, res) => {
  try {
    const queryStrings = req.query;
    const { precio_max, precio_min, categoria, metal } = req.query;

    if (!precio_max && !precio_min && !categoria && !metal) {
      return res.status(filtersNotFoundError.status).send({
        status: filtersNotFoundError.statusText,
        data: filtersNotFoundError.text,
      });
    }

    if (Number.isInteger(precio_max) || Number.isInteger(precio_min)) {
      return res.status(priceIsNotNumericError.status).send({
        status: priceIsNotNumericError.statusText,
        data: priceIsNotNumericError.text,
      });
    }

    const inventario = await getJewelsForFilters(queryStrings);

    return res.json(inventario);
  } catch {
    throw res
      .status(errorServer.status)
      .send({ status: errorServer.statusText, data: errorServer.text });
  }
};

