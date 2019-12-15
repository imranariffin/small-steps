const thunk = services => store => next => async action => {
  if (typeof action !== 'function') {
    return next(action)
  }

  const { getState, dispatch } = store
  await action(getState, dispatch, services)
}

export default thunk
