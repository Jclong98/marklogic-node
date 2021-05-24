import connInfo from './connectionInfo'

const db = marklogic.createDatabaseClient(connInfo)

const results = await db.removeCollection('users').result()
console.log(results)