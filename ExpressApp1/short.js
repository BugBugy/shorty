var redis = require('redis');
var client = redis.createClient();
var hash = require('./hash.js');

client.on('connect', function () {
    console.log('connected');
    client.exists('url_count', function (err, reply) {
        if (reply === 1) {
            console.log('exists');
        } else {
           client.set('url_count', 10001);
        }
    });
});

function shorten(longUrl,callback) {
    client.exists(longUrl, function (err, reply) {
        var base58_hash = "";
        if (reply === 1) {
            console.log('exists');
            var uri = client.get(longUrl, function (err, reply) {
                console.log(reply);
                base58_hash = reply;
                callback(base58_hash);
            });
        }
        else {
            client.incr('url_count', function (err, url_count) {
                base58_hash = hash.encode(url_count);                
                client.set(longUrl, base58_hash);
                client.hmset(base58_hash, 'longUrl', longUrl, 'hash', base58_hash, function (err, reply) {
                    console.log(reply);
                    callback(base58_hash);
                });
                
            });
        }
        
    });
}

function getLongUrl(base58hash,callback) {
    client.hgetall(base58hash, function (err, reply) {
        if (reply != null) {
            callback(null, reply.longUrl);
        }
        else
            callback(err, reply);
    });
}

module.exports.shorten = shorten;
module.exports.getLongUrl = getLongUrl;