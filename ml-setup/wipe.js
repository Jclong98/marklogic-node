import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

import restConfig from './setup-data/01-rest-instance-config.js'

const baseURL = `http://${process.env.MARKLOGIC_HOST}:8002`

async function wipe() {

    // check that the rest api for the database exists
    const response = await axios
        .delete(
            `${baseURL}/v1/rest-apis/${restConfig['rest-api'].name}?include=content&include=modules`,
            {
                auth: {
                    username: process.env.MARKLOGIC_ADMIN_USERNAME,
                    password: process.env.MARKLOGIC_ADMIN_PASSWORD,
                }
            }
        )
        .catch(err => err.response)

    console.log(response.data)
}

wipe()