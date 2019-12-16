const script = `
  CREATE TABLE IF NOT EXISTS Goal (text, status);
`

export default async db => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // console.log('Creating table Goal ...')
      tx.executeSql(script)
    }, error => {
      console.log('Goal: Transaction failure', error)
      reject(error)
    }, () => {
      console.log('Goal: Transaction success')
      resolve()
    })
  })
}
