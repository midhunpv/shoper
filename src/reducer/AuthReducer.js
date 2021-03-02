export default (state = {}, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: action.isSignedIn,
        errClassName:action.errClassName,
        errMessage:action.errorMessage,
        userId: action.payload,
      };
    case "SIGN_UP":
      return {
        ...state,
        isSignedIn: action.isSignedIn,
        userId: action.payload,
      };
    case "USER_EXISTENCE":
      return {
        ...state,
        isUserExists: action.isUserExists,
      };
    case "SIGN_OUT":
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};
