import { applyMiddleware, combineReducers, createStore } from 'redux'

import appReducer from 'ss/common/reducer'
import formsReducer from 'ss/forms/reducer'
import goalsMiddlewares from 'ss/goals/middlewares'
import goalsReducer from 'ss/goals/reducer'
import storagesReducer from 'ss/storages/reducer'
import tasksReducer from 'ss/tasks/reducer'
import client from 'ss/services/client'
import goalsService from 'ss/services/goals'
import loggerService from 'ss/services/logger'
import storage from 'ss/services/storage'
import tasksService from 'ss/services/tasks'

import logger from './logger-middleware'
import thunk from './thunk-middleware'

const reducer = combineReducers(
  {
    app: appReducer,
    forms: formsReducer,
    goals: goalsReducer,
    storages: storagesReducer,
    tasks: tasksReducer
  }
)
const store = createStore(
  reducer,
  applyMiddleware(
    thunk({ client, goalsService, storage, tasksService }),
    logger(loggerService),
    goalsMiddlewares.updateStatus
  )
)

export default store
