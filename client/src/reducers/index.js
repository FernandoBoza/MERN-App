import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errReducer from "./errReducers";

export default combineReducers({
  // this.props.auth
  auth: authReducer,
  // this.props.errors
  errors: errReducer
});
