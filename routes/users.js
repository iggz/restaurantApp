const express = require('express'),
bcrypt = require('bcryptjs'),
router = express.Router();

const User = require('../models/users');

/* GET /users page. */
router.get('/', function(req, res, next) {
    res.render('template', { 
        locals: {
            title: 'User page'
    },
    partials:{
        partial: 'partial-users'
    }
    });
});

router.get('/login', (req,res) => {
res.render('template', {
    locals: {
        title: 'Login Page'
    },
    partials: {
        partial: 'partial-login-form'
    }
    })
});


router.get('/signup', (req,res) => {
    res.render('template', {
        locals: {
            title: 'Sign Up Page'
        },
        partials: {
            partial: 'partial-signup-form'
        }
        })
    });

router.post('/login', (req,res) => {
    console.log(req.body);
    res.sendStatus(200);
});

router.post('/signup', (req,res) => {
    // console.log(req.body);
    const {first_name, last_name, email, password } = req.body;

    // Salt and hash our password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)


    // Create a new user instance, with the sign up information
    const userInstance = new User (null, first_name, last_name, email, hash);
    
    userInstance.save().then(response => {
        console.log("response is", response);
        res.sendStatus(200);

    });
});


module.exports = router;
