
const script = `
  CREATE TABLE IF NOT EXISTS Task (text, status);
`

export default async db => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      console.log('Creating table Task ...')
      tx.executeSql(script)
    }, error => {
      console.log('Task: Transaction failure', error)
      reject(error)
    }, () => {
      console.log('Task: Transaction success')
      resolve()
    })
  })
}
