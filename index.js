const mqtt = require('mqtt');
const config = require('./config');

var mqtt_router = require('./route/handlers');

const client  = mqtt.connect('mqtt://' + config.mqtt.message_broker_url);
const database = require('./database/database');


client.on('connect', () => {
    client.subscribe('log');
	client.publish('log',JSON.stringify({"action":"log", "request_token":"1","body":{"states":{"temp":"12.3","humidity":"15.5"},"device_id":"11"}}));
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
