const express = require('express');
const router = express.Router();

/* GET /reviews page. */
router.get('/', function(req, res, next) {
    res.render('template', { 
        locals: {
            title: 'Reviews'
    },
    partials:{
        partial: 'partial-reviews'
    }
    });
});

module.exports = router;
