const tokenReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { token: action.value };
    default:
      return state;
  }
};

export default tokenReducer;
