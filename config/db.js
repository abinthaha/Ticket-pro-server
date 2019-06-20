var mongoose = require('mongoose')

// connect to database
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/mern-todo-app', { useNewUrlParser: true });
var connection= mongoose
  .connect(
    'mongodb://localhost/ticket_management',
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

module.exports = connection;