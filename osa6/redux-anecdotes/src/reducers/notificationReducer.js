export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

const reducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'HIDE_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export default reducer;