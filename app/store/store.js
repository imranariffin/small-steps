import { applyMiddleware, combineReducers, createStore } from 'redux'

import appReducer from 'ss/models/app/reducer'
import client from 'ss/services/client'
import formsReducer from 'ss/models/forms/reducer'
import goalsReducer from 'ss/models/goals/reducer'
import tasksReducer from 'ss/models/tasks/reducer'

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
    thunk(client),
    logger
  )
)

export default store
