
const userModel = require('../models/user-model');

// User handler
const handleUser = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    userModel.findById(req.session.user._id).then((user) => {
        req.user = user;
        next();
    }).catch((err) => {
        console.log(err);
        res.redirect('/login');
    });
};

// Get login page
const getLogin = (req, res, next) => {
    res.render('login', {
        title: 'Kirjaudu'
    });
};

// Get register page
const getRegister = (req, res, next) => {
    var taken = req.query.taken;
    res.render('register', {
        title: 'Rekisteröidy',
        usernametaken: taken
    });
};

// Logout from todo list
const postLogout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/login');
};

// Try login
const postLogin = (req, res, next) => {
    const userName = req.body.uname;
    console.log(userName);
    userModel.findOne({
        name: userName
    }).then((user) => {
        if (user) {
            req.session.user = user;
            console.log(user);
            return res.redirect('/');
        }
        res.redirect('/login');
    });
};

// Try register new user
const postRegister = (req, res, next) => {
    const userName = req.body.uname;
    
    userModel.findOne({
        name: userName
    }).then((user) => {
        if (user) {
            console.log('User name already registered');
            return res.redirect('/register?taken=1');
        }
        let newUser = new userModel({
            name: userName,
            notes: []
        });

        newUser.save().then(() => {
            return res.redirect('/login');
        });

    });
};

module.exports.handleUser = handleUser;
module.exports.getLogin = getLogin;
module.exports.postLogout = postLogout;
module.exports.postLogin = postLogin;
module.exports.getRegister = getRegister;
module.exports.postRegister = postRegister;