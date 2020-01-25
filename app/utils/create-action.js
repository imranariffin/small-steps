const defaultActions = {
  init: () => ({}),
  success: () => ({}),
  failure: () => ({})
}

const createAction = (actionName, actions = defaultActions) => {
  const REQUEST_TYPE = `${actionName}_REQUEST`
  const SUCCESS_TYPE = `${actionName}_SUCCESS`
  const FAILURE_TYPE = `${actionName}_FAILURE`

  return {
    REQUEST_TYPE,
    SUCCESS_TYPE,
    FAILURE_TYPE,
    init: (...args) => ({ type: REQUEST_TYPE, payload: actions.init(...args) }),
    success: (...args) => ({ type: SUCCESS_TYPE, payload: actions.success(...args) }),
    failure: (...args) => ({ type: FAILURE_TYPE, payload: actions.failure(...args) })
  }
}

export default createAction
