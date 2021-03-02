import productApi from "../apis/productApi";
import UserApi from "../apis/userApi";
import history from "../history";
import CartApi from "../apis/cartApi";
import { PASSWORD_ERROR, INVALID_USER } from "../enums";

export const signIn = (userId, password) => (dispatch) => {
  UserApi.get(`/users/${userId}`)
    .then((response) => {
      if (response.data.password === password) {
        dispatch({
          type: "SIGN_IN",
          isSignedIn: true,
          errClassName: false,
          errorMessage: "",
          payload: response.data,
        });
        history.push("/shoper/shoperhome");
      } else {
        dispatch({
          type: "SIGN_IN",
          isSignedIn: false,
          errClassName: true,
          errorMessage:
            "Password mismatch , Please try again with correct password",
          payload: PASSWORD_ERROR,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: "SIGN_IN",
        isSignedIn: false,
        errClassName: true,
        errorMessage:
          "Invalid Username , Pls try again with correct credentials",
        payload: INVALID_USER,
      });
    });
};
export const chkUserExistence = (userId) => async (dispatch) => {
  const response = await UserApi.get(`/users/${userId}`);
  if (response.data.id) {
    dispatch({ type: "USER_EXISTENCE", isUserExists: true });
  } else {
    dispatch({ type: "USER_EXISTENCE", isUserExists: false });
  }
};
export const signUp = (formValues) => async (dispatch) => {
  let id = formValues.email;
  const response = await UserApi.post("/users", { ...formValues, id });
  dispatch({ type: "SIGN_UP", payload: response.data });
  history.push("/");
};
export const addToCart = (products) => async (dispatch, getState) => {
  const userId = getState().auth.userId.id;
  const id = "_" + Math.random().toString(36).substr(2, 9);
  const response = await CartApi.post("/carts", { ...products, userId, id });
  dispatch({ type: "ADD_TO_CART", payload: response.data });
};
export const fetchProducts = () => async (dispatch) => {
  const response = await productApi.get("/products");
  dispatch({ type: "PRODUCT_FETCH", payload: response.data });
};
export const deleteCartItem = (id) => async (dispatch) => {
  await CartApi.delete(`/carts/${id}`);
  dispatch({ type: "DELETE_CART_ITEM", payload: id });
};
export const fetchCartProducts = (userId) => async (dispatch) => {
  const response = await CartApi.get("/carts", {
    params: {
      userId: userId,
    },
  });
  dispatch({ type: "CART_PRODUCT_FETCH", payload: response.data });
};
export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};
