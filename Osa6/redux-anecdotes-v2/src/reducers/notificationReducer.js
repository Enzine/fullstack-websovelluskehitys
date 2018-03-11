const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'NOTIFY':
        return action.notification
    case 'UNNOTIFY':
        return ''
    default:
        return state
    }
}

export const notify = (message, duration) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      notification: message
    })
    setTimeout(() => {
      dispatch({
        type: 'UNNOTIFY'
      })
    }, duration * 1000)
  }
}

export default notificationReducer