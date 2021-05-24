import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import marklogic from 'marklogic'
import connInfo from './connectionInfo.js'

const db = marklogic.createDatabaseClient(connInfo)

const usersPath = path.join(__dirname, 'data/users.json')
const users = JSON.parse(fs.readFileSync(usersPath))

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