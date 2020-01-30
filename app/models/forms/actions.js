import formsActionTypes from 'ss/models/forms/action-types'

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

const formsDeactivate = formId => (
  {
    type: formsActionTypes.FORMS_DEACTIVATE,
    payload: {
      formId
    }
  }
)

export default {
  formsActivate,
  formsDeactivate,
  formsRegister
}
