const createAction = (
  actionName,
  actions = {
    init: () => ({}),
    success: () => ({}),
    failure: () => ({}),
  }) => (
  {
    init: (...args) => ({ type: `${actionName}_REQUEST`, payload: actions.init(...args) }),
    success: (...args) => ({ type: `${actionName}_SUCCESS`, payload: actions.success(...args) }),
    failure: (...args) => ({ type: `${actionName}_FAILURE`, payload: actions.failure(...args) }),
  }
)

export default createAction
