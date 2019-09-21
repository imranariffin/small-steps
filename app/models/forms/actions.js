import formsActionTypes from 'mg/models/forms/action-types'

const formsRegister = formId => (
  {
    type: formsActionTypes.FORMS_REGISTER,
    payload: {
      formId
    }
  }
)

export default {
  formsRegister
}
