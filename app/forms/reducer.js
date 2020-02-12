import formsActionTypes from 'ss/forms/action-types'

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
    case formsActionTypes.FORMS_DEACTIVATE: {
      const {
        payload: {
          formId
        }
      } = action

      const newState = Object.keys(state).reduce(
        (newState, currentFormId) => {
          newState[currentFormId] = { ...state[currentFormId] }
          return newState
        },
        {}
      )

      newState[formId] = {
        active: false,
        formData: {}
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
