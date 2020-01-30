
const getFormData = formId => state => (
  (
    state.forms[formId] &&
    state.forms[formId].formData
  ) ||
  {}
)

const isFormActive = formId => state => (
  (
    state.forms[formId] &&
    !!state.forms[formId].active
  ) ||
  false
)

export default {
  getFormData,
  isFormActive
}
