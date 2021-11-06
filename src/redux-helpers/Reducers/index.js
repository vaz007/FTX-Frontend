import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
// import authReducer from "./authReducer";
import arbitrageReducer from './arbitrageReducer'
export default combineReducers({
  error: errorReducer,
  arbitrage: arbitrageReducer
  //  auth: authReducer,

});
