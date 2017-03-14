var express = require('express');
var router = express.Router();
var redis = require('../short.js');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'shorty' });
});

router.post('/api/shorten', function (req, res) {
    var shortUrl = "";
    redis.shorten(req.body.url, function (base58_hash) {
        shortUrl = base58_hash;
        res.send({
            'shortUrl': 'http://localhost:1337/' + shortUrl
        });
    });
    
    
});

router.get('/:base58_hash', function (req, res) {
    var base58hash = req.params.base58_hash;
    redis.getLongUrl(base58hash, function (err, reply) {
        if (reply != null)
            res.redirect(reply);
        else
            console.log(err);
    });
});
module.exports = router;