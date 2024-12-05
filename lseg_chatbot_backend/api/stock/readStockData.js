const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../stockData.json");

//reading the JSON file
const readStockData = () => {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
}

module .exports = { readStockData }
