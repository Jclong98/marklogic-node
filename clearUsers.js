import fs from 'fs'

import axios from 'axios'
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


const results = await db.removeCollection('users').result()
console.log(results)