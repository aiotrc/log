require('dotenv').config();

module.exports.mqtt = {
    message_broker_url: process.env.MQTT_MESSAGE_BROKER || 'localhost'
};

module.exports.cassandra = {
    hostname: process.env.CASSANDRA_HOST || 'localhost',
    port: process.env.CASSANDRA_PORT || '9042',
    key_space: process.env.CASSANDRA_KEYSPACE || 'i1820'
};