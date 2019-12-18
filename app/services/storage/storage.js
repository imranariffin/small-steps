import Config from 'react-native-config'
import SQLite from 'react-native-sqlite-storage'

import logger from 'ss/services/logger'

const storage = () => {
  const CONNECTION_TIMEOUT_MS = 15000
  let db, timeoutId, timeout

  const getDb = async () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      logger.log('Closing db connection')
      if (db) {
        db.close()
      }
      db = null
    }, timeout)

    if (db) {
      return db
    }

    const dbName = `small-steps-${Config.NODE_ENV.toLowerCase()}.db`
    db = await SQLite.openDatabase({
      androidDatabaseProvider: 'system',
      location: 'default',
      name: dbName
    })

    logger.log(`Opened db connection: Lasts for at least ${timeout} ms`)

    return db
  }

  const setup = async (options = {}) => {
    timeout = options.timeout || CONNECTION_TIMEOUT_MS
    SQLite.DEBUG(Config.NODE_ENV.toLowerCase() === 'debug')
    SQLite.enablePromise(true)
    db = await getDb()
  }

  const Goal = {
    getAll: async () => {
      const db = await getDb()
      return new Promise((resolve, reject) => {
        db.transaction(async tx => {
          const results = (await tx.executeSql(`
            SELECT * FROM Goal;
          `))[1]
          const goals = []
          for (let i = 0; i < results.rows.length; i++) {
            goals.push(results.rows.item(i))
          }
          resolve(goals)
        })
      })
    },
    save: async goal => {
      const created = goal.created
      const id = goal.id
      const status = goal.status
      const text = goal.text

      if (!created || !id || !status || !text) {
        throw Error(
          'Missing required fields: ' +
          `created=${created}, id=${id}, status=${status}, text=${text}`
        )
      }

      const db = await getDb()

      return new Promise((resolve, reject) => {
        db.transaction(async tx => {
          await tx.executeSql(`
            INSERT INTO Goal (created, id, status, text)
            VALUES ('${created}', '${id}', '${status}', '${text}');
          `)
        }, error => {
          reject(error)
        }, () => {
          resolve(goal)
        })
      })
    }
  }

  const Migration = {
    save: async ({ name, status }) => {
      const db = await getDb()
      return new Promise((resolve, reject) => {
        db.transaction(async tx => {
          await tx.executeSql(`
            INSERT INTO Migration (name, status)
            VALUES ('${name}', '${status}');
          `)
        }, error => {
          reject(error)
        }, () => {
          resolve()
        })
      })
    }
  }

  return {
    getDb,
    models: { Goal, Migration },
    setup
  }
}

export default storage()
