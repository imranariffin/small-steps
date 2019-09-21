import formsActionTypes from 'mg/models/forms/action-types'

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case formsActionTypes.FORMS_ACTIVATE: {
      const {
        payload: {
          form
        }
      } = action

      const newState = Object.keys(state).reduce(
        (newState, form) => {
          newState[form] = { active: false }
          return newState
        },
        state
      )

      newState[form] = { active: true }

      return newState
    }
    case formsActionTypes.FORMS_REGISTER: {
      const {
        payload: {
          formId
        }
      } = action

      return {
        ...state,
        [formId]: { active: false }
      }
    }
    default:
      return state
  }
}

export default reducer
