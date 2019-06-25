var mongoose = require('mongoose')

// const uri = "mongodb+srv://abinthaha:root@cluster0-aiool.azure.mongodb.net/test?retryWrites=true&w=majority";
// const uri = 'mongodb+srv://root:root@cluster0-byofr.mongodb.net/test?retryWrites=true&w=majority';

// connect to database
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/mern-todo-app', { useNewUrlParser: true });
var connection= mongoose
  .connect(
    'mongodb://localhost/request_pro',
    // uri,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

module.exports = connection;