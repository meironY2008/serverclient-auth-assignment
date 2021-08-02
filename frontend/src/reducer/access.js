const accessTokenReducer = (state = "", action) => {
    switch (action.type) {
      case "SET_ACCESS_TOKEN":
        return { access_token: action.value };
      default:
        return state;
    }
  };
  
  export default accessTokenReducer;