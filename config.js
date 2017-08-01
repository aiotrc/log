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
