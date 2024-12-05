const { readStockData } = require("./readStockData");
const createError = require("http-errors");

getStockPerExchanges;
//service to retrieve all stock details
async function getStockExchanges() {
  try {
    const stockData = readStockData();
    const exchanges = stockData.map((exchange) => ({
      code: exchange.code,
      stockExchange: exchange.stockExchange,
    }));

    return exchanges;
  } catch (e) {
    //catch other errors
    console.error(e);
    throw createError.InternalServerError();
  }
}

async function getStockPerExchanges(code) {
  try {
    const stockData = readStockData();
    const exchange = stockData.find((ex) => ex.code === code);
    if (exchange) {
      return exchange.topStocks;
    } else {
      return { status: 400, msg: "Stocks can not be found!!" };
    }
  } catch (e) {
    //catch other errors
    console.error(e);
    throw createError.InternalServerError();
  }
}

module.exports = { getStockExchanges, getStockPerExchanges };
