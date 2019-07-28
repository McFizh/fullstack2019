export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })

    setTimeout( () => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, time*1000 );
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