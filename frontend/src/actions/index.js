export const signIn = () => {
  return {
    type: "SIGN_IN",
  };
};
export const loading = () => {
  return {
    type: "LOADING",
  };
};
export const setToken = (token) => {
  return {
    type: "SET_TOKEN",
    value:token
  };
};
export const setAccessToken = (token) => {
  console.log(token);
  return {
    type: "SET_ACCESS_TOKEN",
    value:token
  };
};
export const setUser = (user) => {
  return {
    type: "SET_USER",
    value:user
  };
};
