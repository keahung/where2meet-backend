// This is just a wrapper around note_routes.js, doesn't do anything
const noteRoutes = require('./note_routes')
module.exports = function(app, db) {
    noteRoutes(app, db);
}