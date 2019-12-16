import logger from 'ss/services/logger'

class Migration {
  constructor (name, script) {
    this.name = name
    this.script = script
  }

  run = db => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        logger.log(`Migration: ${this.name}: Transaction start`)
        tx.executeSql(this.script)
      }, error => {
        logger.log(`Migration: ${this.name}: Transaction failure`, error)
        reject(error)
      }, () => {
        logger.log(`Migration: ${this.name}: Transaction success`)
        resolve()
      })
    })
  }
}

const migrations = [
  new Migration(
    'goals-0001-create-table',
    `
      CREATE TABLE IF NOT EXISTS Goal (text, status);
    `
  ),
  new Migration(
    'tasks-0001-create-table',
    `
      CREATE TABLE IF NOT EXISTS Task (text, status);
    `
  )
]

export default migrations
