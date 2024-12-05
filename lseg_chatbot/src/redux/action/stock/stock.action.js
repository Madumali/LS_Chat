import { STOCK_TYPES } from "../../../utilities/constants/actionTypes";

//Actions for stock lists
const stockListStart = () => ({
  type: STOCK_TYPES.LIST.LOAD_REQUEST,
});

const stockListSuccess = (data) => ({
  type: STOCK_TYPES.LIST.LOAD_SUCCESS,
  payload: data,
});

const stockListError = (errorMessage) => ({
  type: STOCK_TYPES.LIST.LOAD_ERROR,
  payload: errorMessage,
});

const stockListPerExStart = () => ({
  type: STOCK_TYPES.DETAILS.LOAD_REQUEST,
});

const stockListPerExSuccess = (data) => ({
  type: STOCK_TYPES.DETAILS.LOAD_SUCCESS,
  payload: data,
});

const stockListPerExError = (errorMessage) => ({
  type: STOCK_TYPES.DETAILS.LOAD_ERROR,
  payload: errorMessage,
});

export default {
  stockListStart,
  stockListSuccess,
  stockListError,
  stockListPerExStart,
  stockListPerExSuccess,
  stockListPerExError,
};
