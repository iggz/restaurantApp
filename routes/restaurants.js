const express = require('express');
const router = express.Router();

/* GET /restaurants page. */
router.get('/', function(req, res, next) {
    res.render('template', { 
        locals: {
            title: 'Restaurants'
    },
    partials:{
        partial: 'partial-restaurants'
    }
    });
});

module.exports = router;
