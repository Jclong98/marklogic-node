import marklogic from 'marklogic'

const db = marklogic.createDatabaseClient({
    host: '192.168.0.3',
    port: 8010,
    user: "admin",
    password: "admin",
    authType: 'basic'
})

const qb = marklogic.queryBuilder;

const results = await db.documents.query(
    qb.where(        
        qb.collection('users')
    )
).result();

console.log(results)