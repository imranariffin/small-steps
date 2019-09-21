import formsActionTypes from 'mg/models/forms/action-types'

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case formsActionTypes.FORMS_ACTIVATE: {
      const {
        payload: {
          formId,
          formData = {}
        }
      } = action

      const newState = Object.keys(state).reduce(
        (newState, currentFormId) => {
          newState[currentFormId] = { active: false }
          return newState
        },
        {}
      )

      newState[formId] = {
        active: true,
        formData
      }

      return newState
    }
    case formsActionTypes.FORMS_REGISTER: {
      const {
        payload: {
          formId
        }
      } = action

      const newState = Object.keys(state).reduce(
        (newState, currentFormId) => {
          return {
            ...newState,
            [currentFormId]: {
              ...state[currentFormId]
            }
          }
        },
        {}
      )

      return {
        ...newState,
        [formId]: { active: false }
      }
    }
    default:
      return state
  }
}

export default reducer
