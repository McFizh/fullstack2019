export const setNotification = (notification) => ({
  type: 'SET_NOTIFICATION',
  notification
});

const reducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'HIDE_NOTIFICATION':
      return {};
    default:
      return state;
  }
};

export default reducer;