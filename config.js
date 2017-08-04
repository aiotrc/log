require('dotenv').config();

module.exports.mqtt = {
    message_broker_url: process.env.MQTT_MESSAGE_BROKER || '127.0.0.1',
    message_broker_port: process.env.MQTT_MESSAGE_BROKER_PORT || '9994'
};

module.exports.cassandra = {
    hostname: process.env.CASSANDRA_HOST || '127.0.0.1',
    port: process.env.CASSANDRA_PORT || '9042',
    key_space: process.env.CASSANDRA_KEYSPACE || 'i1820'
};

<<<<<<< HEAD
module.exports.influx = {
	hostname: process.env.INFLUX_HOST || '127.0.0.1',
    port: process.env.INFLUX_PORT || '8086',
	database: process.env.INFLUX_DATABASE || 'i1820'
}

=======
>>>>>>> 4f72216f47d21b8d4bf448478aa304e6b4a5ae5c
let mongo = {
    hostname: process.env.MONGO_HOSTNAME || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    db: process.env.MONGO_DB || 'i1820logs',
    auth: process.env.MONGO_AUTH_DB || 'admin',
    username: process.env.MONGO_USERNAME || '',
    password: process.env.MONGO_PASSWORD || ''
};

module.exports.mongodb = mongo;

<<<<<<< HEAD
module.exports.getMongoDBUri = () => 'mongodb://' + mongo.hostname + ':' + mongo.port + '/' + mongo.db;
=======
module.exports.getMongoDBUri = () => 'mongodb://' + mongo.hostname + ':' + mongo.port + '/' + mongo.db;
>>>>>>> 4f72216f47d21b8d4bf448478aa304e6b4a5ae5c
