// Todo-list application
const express = require('express');
//const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;


// Controllers
const todoListController = require('./controllers/todolist_controller');

// Initialise express application
let app = express();

// Add Pug template engine in use
app.set('view engine', 'pug');

// Set body parser in use
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
  
//Serve Static files
//app.use('/css', express.static('css'))
app.use(express.static(__dirname + '/public'));

// Shopping list main view
app.get('/', todoListController.getLists)
 

app.use((req, res, next) => {
    res.status(404);
    res.send(`page not found`);
});

const mongoose_url = 'mongodb+srv://mmadmin:7BLFo7s7tpLidLPJ@cluster0-2vmd2.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoose_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Mongoose connected');
    console.log('Start Express server');
    app.listen(PORT);
});