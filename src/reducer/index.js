import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./AuthReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import cartFetchReducer from "./cartFetchReducer";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  product: productReducer,
  cart:cartReducer,
  cartFetch:cartFetchReducer
});
