export const doLogin = (credentials) => ({
  type: 'LOGIN',
  credentials
});

export const setUserData = (user) => ({
  type: 'STORE_USER',
  user
});

export const doLogout = () => ({
  type: 'LOGOUT'
});

const reducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return action.data;
    case 'LOGOUT_SUCCESS':
      return null;
    case 'STORE_SUCCESS':
      return action.user;
    default:
      return state;
  }
};

export default reducer;