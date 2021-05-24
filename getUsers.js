import marklogic from 'marklogic'
import connInfo from './connectionInfo.js'

const db = marklogic.createDatabaseClient(connInfo)
const qb = marklogic.queryBuilder;

const results = await db.documents.query(
    qb.where(        
        qb.collection('users')
    )
).result();

console.log(results)