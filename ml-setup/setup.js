import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const baseURL = `http://${process.env.MARKLOGIC_HOST}:8002`

const restConfigPath = path.join(__dirname, '01-rest-instance-config.json')
const restConfig = JSON.parse(fs.readFileSync(restConfigPath))

const dbConfigPath = path.join(__dirname, '02-database-config.json')
const dbConfig = JSON.parse(fs.readFileSync(dbConfigPath))

async function setup() {

    // check that the rest api for the database exists
    const response = await axios
        .get(
            // `${baseURL}/v1/rest-apis`,
            `${baseURL}/v1/rest-apis/`,
            {
                auth: {
                    username: process.env.MARKLOGIC_ADMIN_USERNAME,
                    password: process.env.MARKLOGIC_ADMIN_PASSWORD,
                }
            }
        )
        .catch(err => err.response)

    if ("errorResponse" in response.data) {
        console.error(response.data)
        return
    }

    // creating rest instance
    const postResponse = await axios.post(
        `${baseURL}/v1/rest-apis`,
        restConfig,
        {
            auth: {
                username: process.env.MARKLOGIC_ADMIN_USERNAME,
                password: process.env.MARKLOGIC_ADMIN_PASSWORD,
            }
        }
    ).catch(err => err.response)

    console.log(postResponse.data)

    // configuring database
    const putResponse = await axios.put(
        `${baseURL}/manage/v2/databases/testdb-content/properties`,
        dbConfig,
        {
            auth: {
                username: process.env.MARKLOGIC_ADMIN_USERNAME,
                password: process.env.MARKLOGIC_ADMIN_PASSWORD,
            }
        }
    ).catch(err => err.response)

    console.log(putResponse.data)

}

setup()