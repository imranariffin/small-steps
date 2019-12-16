import Config from 'react-native-config'
import SQLite from 'react-native-sqlite-storage'

import logger from 'ss/services/logger'

const storage = () => {
  let db

  const setup = () => {
    const dbName = `small-steps-${Config.NODE_ENV.toLowerCase()}.db`
    db = SQLite.openDatabase({
      androidDatabaseProvider: 'system',
      location: 'default',
      name: dbName
    })
    logger.log('Connected to db:', db)
  }

  const getDb = () => db

  const Goal = {
    save: async goal => {
      return Promise.resolve(goal)
    }
  }

  return {
    setup,
    getDb,
    models: {
      Goal
    }
  }
}

export default storage()
