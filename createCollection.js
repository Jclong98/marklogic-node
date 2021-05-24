import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv'
dotenv.config()

import marklogic from 'marklogic'
import connInfo from './connectionInfo'

const db = marklogic.createDatabaseClient(connInfo)


const usersPath = path.join(__dirname, 'data/users.json')
const users = JSON.parse(fs.readFileSync(usersPath))

const results = await db.createCollection('users', users).result()

console.log(results)