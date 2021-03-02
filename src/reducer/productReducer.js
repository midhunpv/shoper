import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_FETCH":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
