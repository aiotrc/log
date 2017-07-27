const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://localhost');
var mqtt_router = require('./route/mqtt-router');

client.on('connect', function () {
    client.subscribe('log');
    client.publish('log', JSON.stringify({'event':'this'}));
});

client.on('message', function (topic, message) {
    let messageObj = JSON.parse(message.toString());

    if (messageObj.action){
        mqtt_router.invoke(messageObj.action)(messageObj.body, messageObj.request_token);
    }else{
        console.error('Message passed to the log system is not obeying the protocol')
    }
});