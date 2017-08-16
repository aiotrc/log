require('dotenv').config();

module.exports.mqtt = {
    message_broker_url: process.env.MQTT_MESSAGE_BROKER || '127.0.0.1',
    message_broker_port: process.env.MQTT_MESSAGE_PORT || '1883',
    sub_chanel: process.env.MQTT_SUB_CHANNEL || 'log'
};

module.exports.cassandra = {
    hostname: process.env.CASSANDRA_HOST || '127.0.0.1',
    port: process.env.CASSANDRA_PORT || '9042',
    key_space: process.env.CASSANDRA_KEYSPACE || 'i1820'
};

module.exports.influx = {
    hostname: process.env.INFLUX_HOST || '127.0.0.1',
    port: process.env.INFLUX_PORT || '8086',
    database: process.env.INFLUX_DATABASE || 'i1820'
};


let mongo = {
    hostname: process.env.MONGO_HOSTNAME || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    db: process.env.MONGO_DB || 'i1820logs',
    auth: process.env.MONGO_AUTH_DB || 'admin',
    username: process.env.MONGO_USERNAME || 'admin',
    password: process.env.MONGO_PASSWORD || 'admin',
    collection: process.env.MONGO_LOG_COLLECTION || 'log'
};
let http = {
    port: process.env.HTTP_SERVER_PORT || 8080
};

module.exports.http = http;

module.exports.mongodb = mongo;

module.exports.getMongoDBUri = () => 'mongodb://admin:mohtadin@' + mongo.hostname + ':' + mongo.port + '/' + mongo.db + '?authMechanism=DEFAULT&authSource=admin';