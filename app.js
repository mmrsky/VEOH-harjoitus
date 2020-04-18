//https://pugjs.org/language/interpolation.html

// Todo-list application
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;


// Controllers
const todoListController = require('./controllers/todolist_controller');
const authController = require('./controllers/auth_controller');

// Initialise express application
let app = express();

// Add Pug template engine in use
app.set('view engine', 'pug');

// Set body parser in use
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'ökljölkj',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000
    }
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
  
//Serve Static files
app.use(express.static(__dirname + '/public'));

const isLoggedHandler = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

// Authorization
app.use(authController.handleUser);
app.get('/login', authController.getLogin);
app.post('/login', authController.postLogin);
app.get('/logout', authController.postLogout);
app.get('/register', authController.getRegister);
app.post('/register', authController.postRegister);


// Todos
app.get('/', isLoggedHandler, todoListController.getTodos);
app.post('/add-todo', isLoggedHandler, todoListController.postTodo);
app.post('/delete-todo', isLoggedHandler, todoListController.postDeleteTodo);
app.get('/todo/:id', isLoggedHandler, todoListController.getTodo);


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