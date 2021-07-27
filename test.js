import marklogic from 'marklogic'
import connInfo from './connectionInfo.js'

const db = marklogic.createDatabaseClient(connInfo)
const qb = marklogic.queryBuilder;

// console.log(qb.value('seomthing', 'something else'))
// console.log(qb.range('id', '>', 990))

let queryObject = {
    "jsonPropertyValueQuery": {
        "property": [
            "id"
        ],
        "value": [
            666
        ],
        "options": [
            "lang=en"
        ]
    }
}

const query = qb.where(qb.value('id', 666))
const queryResults = await db.documents.query(query).result()
console.log(queryResults)