import initialState from "./state.json";

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case "authentication/IS_AUTHENTICATED": {
      return {
        ...state,
        isAuthenticated: action.bool,
      }
    }
  }
}

