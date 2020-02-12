import appActionTypes from 'ss/common/action-types'

const initialState = {
  deviceId: '',
  timezone: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case appActionTypes.INIT_APP: {
      const {
        payload: {
          deviceId,
          timezone
        }
      } = action

      return {
        deviceId,
        timezone
      }
    }
    default:
      return state
  }
}

export default reducer
