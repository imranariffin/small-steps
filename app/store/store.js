import { applyMiddleware, combineReducers, createStore } from 'redux'

import appReducer from 'mg/models/app/reducer'
import client from 'mg/services/client'
import formsReducer from 'mg/models/forms/reducer'
import goalsReducer from 'mg/models/goals/reducer'
import tasksReducer from 'mg/models/tasks/reducer'

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
