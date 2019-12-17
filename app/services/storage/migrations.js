import logger from 'ss/services/logger'

class Migration {
  constructor (name, script) {
    this.name = name
    this.script = script
  }

  run = db => {
    return new Promise((resolve, reject) => {
      db.transaction(async tx => {
        logger.log(`Migration: ${this.name}: Transaction start`)
        const [tx1, results] = await tx.executeSql(this.script)
        console.log(tx1, results)
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
    'migrations-0001-create-table',
    `
      CREATE TABLE IF NOT EXISTS Migration (
        name TEXT UNIQUE NOT NULL,
        status TEXT
      );
    `
  ),
  new Migration(
    'goals-0001-create-table',
    `
      CREATE TABLE IF NOT EXISTS Goal (
        id TEXT UNIQUE NOT NULL,
        created TEXT NOT NULL,
        text TEXT,
        status TEXT
      );
    `
  ),
  new Migration(
    'tasks-0001-create-table',
    `
      CREATE TABLE IF NOT EXISTS Task (
        id TEXT UNIQUE NOT NULL,
        created TEXT NOT NULL,
        text TEXT,
        status TEXT
      );
    `
  )
]

export default migrations
