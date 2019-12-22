import Config from 'react-native-config'
import SQLite from 'react-native-sqlite-storage'

import logger from 'ss/services/logger'

export const storage = () => {
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

  const Task = {
    getAll: async () => {
      const db = await getDb()
      return new Promise((resolve, reject) => {
        try {
          db.transaction(async tx => {
            let results
            let tasks = []
            try {
              results = (await tx.executeSql(`
                SELECT * FROM Task;
              `))[1]
            } catch (error) {
              reject(error)
            }

            for (let i = 0; i < results.rows.length; i++) {
              tasks.push(results.rows.item(i))
            }

            resolve(tasks)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    getById: async (id) => {
      const db = await getDb()
      return new Promise(resolve => {
        db.transaction(async tx => {
          const results = (await tx.executeSql(`
            SELECT * FROM Task
            WHERE id = '${id}';
          `))[1]
          resolve(results.rows.item(0))
        })
      })
    }
  }

  return {
    getDb,
    models: { Goal, Migration, Task },
    setup
  }
}

export default storage()
