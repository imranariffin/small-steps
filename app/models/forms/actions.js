import formsActionTypes from 'mg/models/forms/action-types'

const formsRegister = formId => (
  {
    type: formsActionTypes.FORMS_REGISTER,
    payload: {
      formId
    }
  }
)

const formsActivate = (formId, formData) => (
  {
    type: formsActionTypes.FORMS_ACTIVATE,
    payload: {
      formId,
      formData
    }
  }
)

export default {
  formsActivate,
  formsRegister
}
