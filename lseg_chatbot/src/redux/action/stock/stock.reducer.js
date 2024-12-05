import { STOCK_TYPES } from "../../../utilities/constants/actionTypes";

//initial state
const initialState = {
  isLoadingStock: false,
  stockList: [],
  errorMessage: null,
  isLoading: false,
  selectedStock: [],
  errorDetails: null,
};

const stockReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STOCK_TYPES.LIST.LOAD_REQUEST:
      return {
        ...state,
        isLoadingStock: true,
        stockList: [],
        errorMessage: null,
      };

    case STOCK_TYPES.LIST.LOAD_SUCCESS:
      return {
        ...state,
        isLoadingStock: false,
        stockList: payload ? payload : [],
        errorMessage: null,
      };

    case STOCK_TYPES.LIST.LOAD_ERROR:
      return {
        ...state,
        isLoadingStock: false,
        stockList: [],
        errorMessage: payload,
      };

    case STOCK_TYPES.DETAILS.LOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
        selectedStock: [],
        errorDetails: null,
      };

    case STOCK_TYPES.DETAILS.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedStock: payload ? payload : [],
        errorDetails: null,
      };

    case STOCK_TYPES.DETAILS.LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
        selectedStock: [],
        errorDetails: payload,
      };

    default:
      return state;
  }
};

export default stockReducer;
