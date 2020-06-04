const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const url = process.env.PROD_MONGODB
const app = express()
const port = 8000;

app.use(bodyParser.urlencoded({extended: true}))
MongoClient.connect(url, (err, database) => {
    if (err) {
        return console.log(err)
    }
    const datab = database.db("noteDB")
    require('./app/routes')(app, datab)
})

app.listen(port, () => { console.log('We are live on ' + port) })
