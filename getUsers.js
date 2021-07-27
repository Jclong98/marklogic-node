import marklogic from 'marklogic'
import connInfo from './connectionInfo.js'

const db = marklogic.createDatabaseClient(connInfo)
const qb = marklogic.queryBuilder;

// pagination variables
const page = 1
const limit = 10
const startIndex = (page - 1) * limit
const endIndex = page * limit

const orderBy = 'id'
const direction = 'ascending'
// const direction = 'descending'

const query = qb.where(
    qb.and(
        qb.collection('users'),
        qb.value("email", "*@4shared.com", ['wildcarded'])
    )
)

const queryResults = await db.documents.query(
    query
        .orderBy(qb.sort(orderBy, direction))
        .slice(startIndex, endIndex)
        .withOptions({ queryPlan: true })
).result();

// the queryplan contains things like total 
// length of query, start index, and page length
const queryPlan = queryResults.shift()

let results = {}

if (endIndex < queryPlan.total) {
    results.next = {
        page: page + 1,
        limit: limit
    }
}

if (startIndex > 0 && startIndex < queryPlan.total + 1) {
    results.previous = {
        page: page - 1,
        limit: limit
    }
}

// results.data = queryResults
results.data = queryResults.map(doc => doc.content)

console.log(results)

