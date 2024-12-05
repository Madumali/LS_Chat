import actions from "./stock.action";
import StockService from "../../../services/stock.service";
import { handleThunkError } from "../../../helpers/thunkErrorHandling";

//Thunk which triggers Stock Exchange List Actions
export const loadStockExchangeList = (payload, auth) => (dispatch) => {
  dispatch(actions.stockListStart());

  StockService.getStock(payload, auth)
    .then((response) => {
      return dispatch(actions.stockListSuccess(response.data));
    })
    .catch((error) => {
      handleThunkError(error);
      return dispatch(actions.stockListError(error));
    });
};
//Thunk which triggers Stock name List Actions
export const loadStockListPerExchange = (payload, auth) => (dispatch) => {
  dispatch(actions.stockListPerExStart());
  StockService.getStockPerExchange(payload)
    .then((response) => {
      return dispatch(actions.stockListPerExSuccess(response.data));
    })
    .catch((error) => {
      handleThunkError(error);
      return dispatch(actions.stockListPerExError(error));
    });
};
