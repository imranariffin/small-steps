const logger = logger => store => next => action => {
  const prevState = store.getState()
  const nextAction = next(action)
  const nextState = store.getState()

  logger.log('prevState', prevState)
  logger.log('action', action)
  logger.log('nextState', nextState)

  return nextAction
}

export default logger
