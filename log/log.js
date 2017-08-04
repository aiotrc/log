const winston = require('winston');
require('winston-mongodb').MongoDB;
const config = require('./../config');

winston.add(winston.transports.MongoDB, {
    username: config.mongodb.username,
    password: config.mongodb.password,
    db: config.getMongoDBUri(),
    collection: 'log',
    authDb: config.mongodb.auth
});


module.exports = winston;