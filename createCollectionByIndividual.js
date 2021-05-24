import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv'
dotenv.config()

import marklogic from 'marklogic'


const db = marklogic.createDatabaseClient({
    host: '192.168.0.3',
    port: 8010,
    user: "admin",
    password: "admin",
    authType: 'basic'
})


const usersPath = path.join(__dirname, 'data/users.json')
const users = JSON.parse(fs.readFileSync(usersPath))

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