const mqtt = require('mqtt');
const config = require('./config');
var mqtt_router = require('./route/handlers');
const client  = mqtt.connect('mqtt://' + config.mqtt.message_broker_url + ":" + config.mqtt.message_broker_port);
const database = require('./database/database');
const log = require('./log/log');

client.on('connect', () => {
    client.subscribe(config.mqtt.sub_chanel);
    // log.log('Start subscribing on chanel : ' + config.mqtt.sub_chanel);
    database.cassandraConnect().
    then((cassandraClient)=>console.log('Successfully connected to cassandra')).
    error((error)=> console.log(error));

	database.influxConnect()
	.then((influxClient) => console.log('Successfully connected to influx'))
	.error((error) => console.log(error));

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



