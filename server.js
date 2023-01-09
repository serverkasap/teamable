const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const { isEmptyPayload, isInvalidEmail } = require('./validator')

const app = express()

app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist'))


const { DB_USER, DB_PASS, DEV } = process.env
const dbAddress = '127.0.0.1:27017'

// Database Name
const dbName = 'company_db'

// Collection Name
const collName = 'employees'

// Connection URL
const url = DEV ? `mongodb://${dbAddress}` : `mongodb://${DB_USER}:${DB_PASS}@${dbAddress}?authSource=${dbName}`
const client = new MongoClient(url)

app.get('/get-profile', async function (req, res) {
    // Connect to mongodb database
    await client.connect()
    console.log('Connected successfully to database server')

    // Initiate or get the db & collection
    const db = client.db(dbName)
    const collection = db.collection(collName)

    // Get data from database
    const result = await collection.findOne({ id: 1 })
    console.log(result)

    // Close db connection
    client.close()

    response = {}

    if (result !== null) {
        response = {
            name: result.name,
            email: result.email,
            interests: result.interests
        }
    }

    res.send(response)
})

app.post('/update-profile', async function (req, res) {
    const payload = req.body

    console.log(payload)

    if (isEmptyPayload(payload) || isInvalidEmail(payload)) {
        res.status(400).send({ error: "Invalid payload. Couldn't update user profile data!" })
    } else {
        // Connect to mongodb database
        await client.connect()
        console.log('Connected successfully to database server')

        // Initiate or get the db & collection
        const db = client.db(dbName)
        const collection = db.collection(collName)

        // Save payload data to the database
        payload['id'] = 1

        const updatedValues = { $set: payload }

        await collection.updateOne({ id: 1 }, updatedValues, { upsert: true });

        // Close db connection
        client.close()

        res.status(200).send({ info: "User profile data updated successfully!" })
    }
})

const server = app.listen(8080, function () {
    console.log("Listening on port 8080...")
})

module.exports = {
    app,
    server
}