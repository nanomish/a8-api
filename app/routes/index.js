
const noteRoutes = require('./note_routes');
const listRoutes = require('./list_routes');

module.exports = function(app, db) {
  noteRoutes(app, db);
  listRoutes(app, db);
  // Other route groups could go here, in the future
};