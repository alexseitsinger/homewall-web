import initialState from "./state.json";

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
