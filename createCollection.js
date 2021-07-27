import marklogic from 'marklogic'
import connInfo from './connectionInfo.js'
import users from './data/users.js'

const db = marklogic.createDatabaseClient(connInfo)

// you could do it this way, but it gives less control
// no multiple collections, no custom uri paths
// const results = await db.createCollection('users', users).result()

// making a document descriptor for each document inserted
const userDocs = users.map(user => {
    return {
        uri: `/users/${user.id}.json`,
        contentType: 'application/json',
        content: user,
        collections: ['users']
    }
})

// https://docs.marklogic.com/jsdoc/documents.html#write
// this can take one or multiple documents
const results = await db.documents.write(userDocs).result()

console.log(results)
