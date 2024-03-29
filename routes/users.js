const express = require('express'),
    bcrypt = require('bcryptjs'),
    router = express.Router();

const User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('template', { 
        locals: {
            title: 'User page',
            is_logged_in: req.session.is_logged_in
    },
    partials:{
        partial: 'partial-users'
    }
    });
});

router.get('/login', (req,res) => {
res.render('template', {
    locals: {
        title: 'Login Page',
        is_logged_in: req.session.is_logged_in
    },
    partials: {
        partial: 'partial-login-form'
    }
    })
});


router.get('/signup', (req,res) => {
    res.render('template', {
        locals: {
            title: 'Sign Up Page',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-signup-form'
        }
    })
});


router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/');
});


router.post('/login', (req,res) => {
    const { email, password } = req.body;
    console.log(req.body)

    const userInstance = new User(null, null, null, email, password);

    userInstance.login().then(response => {
        req.session.is_logged_in = response.isValid;
        console.log("post login response is", response);

        if (!!response.isValid) {
            req.session.first_name = response.first_name;
            req.session.last_name = response.last_name;
            req.session.user_id = response.user_id;
            res.redirect('/');
        } else {
            res.sendStatus(401);
        }
    });
    // console.log(req.body);
    // res.sendStatus(200);
});

router.post('/signup', async (req,res) => {
    
    // this is the fast way of doing this
    // const { first_name, last_name, email, password } = req.body;

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    console.log('req.body is displayed as: ', req.body);
    console.log('email as entered', email);
    // Salt and hash our password
    const salt = bcrypt.genSaltSync(10);  // 10 is the amount of random characters to add to our password.
    
    // hash = password123 => asdlfkja;sldfja;lsfj234l2l4j23lk4j
    // hash + salt = password123 => )(**@^$LKJHA@KJkajh209)(*#(@))
    // adding salt to hashing exponentially increases security.
    const hash = bcrypt.hashSync(password, salt) // This generates a hash based on the password and the salt

    // Create a new user instance, with the sign up information
    const userInstance = new User (null, first_name, last_name, email, hash);
    
    let check = await userInstance.CheckIfDuplicate();

    if(typeof check === 'object') {
        console.log('This email is already registered. Please register a new email ya freakin jabronie!!!!');
        res.redirect('/users/login');
    } else {
    await userInstance.save().then(response => {
        console.log("signup response is", response);
        res.redirect('/users/login');
    });
}
});

module.exports = router;