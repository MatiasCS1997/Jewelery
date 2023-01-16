const express = require("express");
const router = express.Router();

const {
  getJewels,
  getJewelsForFilters,
} = require("../controllers/jewelsController");

router.get("/inventario/joyas", getJewels);
router.get("/inventario/filtros", getJewelsForFilters);

module.exports = router;
