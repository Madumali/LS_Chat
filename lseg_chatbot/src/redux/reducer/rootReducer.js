import { combineReducers } from "redux";
import stockReducer from "../action/stock/stock.reducer";
import chatReducer from "../action/chat/chat.reducer";
 //combined all Reducders
const rootReducer = () =>
  combineReducers({
    stock: stockReducer,
    chat: chatReducer,
  });

export default rootReducer;
