import { applyMiddleware, combineReducers, createStore } from 'redux'

import appReducer from 'ss/models/app/reducer'
import formsReducer from 'ss/models/forms/reducer'
import goalsReducer from 'ss/models/goals/reducer'
import tasksReducer from 'ss/models/tasks/reducer'
import client from 'ss/services/client'
import goalsService from 'ss/services/goals'
import loggerService from 'ss/services/logger'

import logger from './logger-middleware'
import thunk from './thunk-middleware'

const reducer = combineReducers(
  {
    app: appReducer,
    forms: formsReducer,
    goals: goalsReducer,
    tasks: tasksReducer
  }
)
const store = createStore(
  reducer,
  applyMiddleware(
    thunk({ client, goalsService }),
    logger(loggerService)
  )
)

export default store
