// https://medium.com/@nima.2004hkh/create-your-first-login-page-with-exprerssjs-pug-f42250229486

//https://www.456bereastreet.com/archive/200711/use_the_label_element_to_make_your_html_forms_accessible/
const user_model = require('../models/user-model');
//const auth_views = require('../views/auth-views');

// User handler
const handleUser = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    user_model.findById(req.session.user._id).then((user) => {
        req.user = user;
        next();
    }).catch((err) => {
        console.log(err);
        res.redirect('/login');
    });
};

// 
const getLogin = (req, res, next) => {
    res.render('login', {
        title: 'Kirjaudu'
    });
};

const getRegister = (req, res, next) => {
    res.render('register', {
        title: 'Rekisteröidy'
    });
};

// Logout from shopping list
const postLogout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/login');
};

// Try login
const postLogin = (req, res, next) => {
    console.log('post login 1');
    const userName = req.body.user_name;
    user_model.findOne({
        name: userName
    }).then((user) => {
        if (user) {
            req.session.user = user;
            return res.redirect('/');
        }
        console.log('post login');
        res.redirect('/login');
        
    });
};

// Try register new user
const postRegister = (req, res, next) => {
    const userName = req.body.user_name;

    user_model.findOne({
        name: userName
    }).then((user) => {
        if (user) {
            console.log('User name already registered');
            return res.redirect('/login');
        }

        let new_user = new user_model({
            name: userName,
            notes: []
        });

        new_user.save().then(() => {
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