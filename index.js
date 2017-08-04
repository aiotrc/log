const mqtt = require('mqtt');
const config = require('./config');

var mqtt_router = require('./route/handlers');

const client  = mqtt.connect('mqtt://' + config.mqtt.message_broker_url + ":" + config.mqtt.message_broker_port);
const database = require('./database/database');


client.on('connect', () => {
    client.subscribe('log');
    database.cassandraConnect().
    then((cassandraClient)=>console.log('Successfully connected to cassandra')).
    error((error)=> console.log(error));
});

client.on('message', (topic, message) => {
    let messageObj = JSON.parse(message.toString());

    if (messageObj.action){
        console.log(messageObj.action);
        mqtt_router.invoke(messageObj.action)(messageObj.body, messageObj.request_token);
    }else{
        console.error('Message passed to the log system is not obeying the protocol')
    }
});
