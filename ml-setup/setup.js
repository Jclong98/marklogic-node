import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

import restConfig from './setup-data/01-rest-instance-config.js'
import dbConfig from './setup-data/02-database-config.js'

const baseURL = `http://${process.env.MARKLOGIC_HOST}:8002`

async function setup() {

    // check that the rest api for the database exists
    const response = await axios
        .get(
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