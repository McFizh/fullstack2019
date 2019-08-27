export const fetchUsers = () => ({
  type: 'FETCH_USERS'
});

const reducer = (state = null, action) => {
  switch(action.type) {
    case 'USERS_LOADED':
      return action.data;
    default:
      return state;
  }
};

export default reducer;