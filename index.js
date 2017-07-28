const mqtt = require('mqtt');

var mqtt_router = require('./route/handlers');

const client  = mqtt.connect('mqtt://localhost');
const database = require('./database/database');

client.on('connect', () => {
    client.subscribe('log');

    database.cassandraConnect().
    then((client)=>console.log('Successfully connected to cassandra')).
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