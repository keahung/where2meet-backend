var ObjectID = require('mongodb').ObjectID

// Routes are wrapped in function
// app : Express instance
// db  : database
module.exports = function(app, db) {
    app.get('/notes/:id', (req, res) => {
        console.log('received get')
        const details = { '_id' : new ObjectID(req.params.id) }
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error' : 'An error has occured' })
            } else {
                res.send(item)
            }
        })
    })

    app.post('/notes', (req, res) => {
        // Create note here
        console.log('received post')
        const note =
        {
            text  : req.body.body,
            title : req.body.title
        }
        // Insert into the collection within the database
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error' : 'An error has occured' })
            } else {
                res.send(result.ops[0])
            }
        })
        console.log(req.body)
    })

    app.delete('/notes/:id', (req, res) => {
        console.log('received delete')
        const details = { '_id' : new ObjectID(req.params.id) }
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error' : 'An error has occured' })
            } else {
                res.send('Note ' + req.params.id + ' deleted!')
            }
        })
    })

    app.put('/notes/:id', (req, res) => {
        console.log('received put')
        const details = { '_id' : new ObjectID(req.params.id) }
        const note =
        {
            text  : req.body.body,
            title : req.body.title
        }
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({ 'error' : 'An error has occured' })
            } else {
                res.send(note)
            }
        })
    })
}