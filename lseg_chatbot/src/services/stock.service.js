import axiosInstance from "../helpers/api";

class StockService {
  getStock = (payload) => axiosInstance.post(`/stock/stock-exchanges`, payload); //service to get Stock Exchanges

  getStockPerExchange = (payload) =>
    axiosInstance.post(`/stock/exchange`, payload); // Service to get stocks per selected exchange
}

export default new StockService();
