import connInfo from './connectionInfo.js'

const db = marklogic.createDatabaseClient(connInfo)

const results = await db.removeCollection('users').result()
console.log(results)