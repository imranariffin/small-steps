import { applyMiddleware, combineReducers, createStore } from 'redux'

import appReducer from 'ss/models/app/reducer'
import formsReducer from 'ss/models/forms/reducer'
import goalsReducer from 'ss/models/goals/reducer'
import migrationsReducer from 'ss/models/migrations/reducer'
import tasksReducer from 'ss/models/tasks/reducer'
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
    migrations: migrationsReducer,
    tasks: tasksReducer
  }
)
const store = createStore(
  reducer,
  applyMiddleware(
    thunk({ client, goalsService, storage, tasksService }),
    logger(loggerService)
  )
)

export default store
