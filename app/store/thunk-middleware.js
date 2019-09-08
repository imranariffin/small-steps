const thunk = client => store => next => async action => {
  if (typeof action !== 'function') {
    return next(action)
  }

  const { getState, dispatch } = store
  await action(getState, dispatch, { client })
}

export default thunk
