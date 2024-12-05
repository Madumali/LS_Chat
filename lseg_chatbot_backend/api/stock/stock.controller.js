const express = require("express");
const router = express.Router();
const stockService = require("./stock.service");

//routes to endpoints
router.post("/stock-exchanges", getStockExchanges);
router.post("/exchange", getStockPerExchanges);

module.exports = router;

// controllers per each endpoint

// get All Stock exchanges
function getStockExchanges(req, res, next) {
  stockService
    .getStockExchanges()
    .then((response) => {
      res.json(response);
    })
    .catch(next);
}

// get Stock Per exchanges
function getStockPerExchanges(req, res, next) {
  const { code } = req.body;
  stockService
    .getStockPerExchanges(code)
    .then((response) => {
      res.json(response);
    })
    .catch(next);
}
