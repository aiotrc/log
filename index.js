const mqtt = require('mqtt');
const config = require('./config');
var mqtt_router = require('./route/handlers');
const client  = mqtt.connect('mqtt://' + config.mqtt.message_broker_url + ":" + config.mqtt.message_broker_port);
const database = require('./database/database');
const logger = require('./log/log');

client.on('connect', () => {
    client.subscribe(config.mqtt.sub_chanel);
    logger.log('info','Start subscribing on chanel : ' + config.mqtt.sub_chanel);
    database.cassandraConnect().
    then((cassandraClient)=> console.log('Successfully connected to cassandra')).
    error((error)=> logger.log('error', error));

	database.influxConnect().
    then((influxClient) => console.log('Successfully connected to influx')).
    error((error)=> logger.log('error', error));

});

client.on('message', (topic, message) => {
    let messageObj = JSON.parse(message.toString());

    if (messageObj.action){
        mqtt_router.invoke(messageObj.action)(messageObj.body, messageObj.request_token);
    }else{
        logger.log('error', 'Message passed to the log system is not obeying the protocol');
    }
});



