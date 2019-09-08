const logger = store => next => action => {
  const prevState = store.getState()
  const nextAction = next(action)
  const nextState = store.getState()

  console.log('prevState', prevState)
  console.log('action', action)
  console.log('nextState', nextState)

  return nextAction
}

export default logger
