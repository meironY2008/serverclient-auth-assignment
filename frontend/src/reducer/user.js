const userReducer = (state = { email: "" }, action) => {
  switch (action.type) {
    case "SET_USER":
      return { user: action.value };
    default:
      return state;
  }
};
export default userReducer;
