const winston = require('winston');
require('winston-mongodb').MongoDB;
const config = require('./../config');

function getMongoUrl() {
    return 'mongodb://' + config.mongodb.username + ':' + config.mongodb.password + '@' + config.mongodb.hostname + ':' + config.mongodb.port + '/' + config.mongodb.db + '?authMechanism=DEFAULT&authSource=' + config.mongodb.auth;
}

winston.add(winston.transports.MongoDB, {
    db:getMongoUrl(),
    collection: config.mongodb.collection,
});

module.exports = winston;