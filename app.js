import express from 'express'
import marklogic from 'marklogic'
import connInfo from './connectionInfo'

const db = marklogic.createDatabaseClient(connInfo)
const qb = marklogic.queryBuilder

const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.send("custom marklogic rest home")
})

app.get('/users', (req, res) => {
    db.documents.query(
        qb.where(
            qb.collection('users'),
        )
    ).result(results => {
        res.json(results)
    });
})

app.get('/users/:id', async (req, res) => {
    const result = await db.documents.query(
        qb.where(
            qb.and([
                qb.collection('users'),
                qb.value("id", parseInt(req.params.id))
            ])
        )
    ).result()

    res.json(result)
})

app.delete('/users/:id', async (req, res) => {
    
    const result = await db.documents.remove(`/users/${req.params.id}`).result()

    res.json(result)
})


app.listen(3000, err => {
    if (err) throw err
    console.log('Server running in http://127.0.0.1:3000')
})