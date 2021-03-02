export default (state = {}, action) => {
    switch (action.type) {
      case "CART_PRODUCT_FETCH":
        return { ...state, [action.payload.id]:action.payload};
      default:
        return state;
    }
  };
  