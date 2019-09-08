import { applyMiddleware, combineReducers, createStore } from 'redux'

import goalsReducer from 'mg/models/goals/reducer'
import appReducer from 'mg/models/app/reducer'
import client from 'mg/services/client'

import logger from './logger-middleware'
import thunk from './thunk-middleware'

const reducer = combineReducers(
  {
    app: appReducer,
    goals: goalsReducer
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
