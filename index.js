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

    database.influxClient().write('logs')
        .tag({
            device_id : 2
        })
        .field({
            hum : 4.5,
            koon : 2,
            temp : 3.4
        })
        .then(()=> console.log('write done'))
        .catch(console.error);
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
