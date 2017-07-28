var mqtt_router = require('./mqtt-router');
var moment = require('moment');

const db = require('./../database/database');

mqtt_router.on('log', (body, request_token)=>{
    const query = "INSERT INTO logs (timestamp, nanoseconds, device_id, status) VALUES";
    let nanoseconds = process.hrtime()[1];
    let timestamp = moment().unix();
    let parameter = [timestamp, nanoseconds, body.device_id, status];
    db.cassandraClient().execute(query, body, (error)=>{
        console.error(error);
    });
    console.log('log handler is called');
});

mqtt_router.on('get', (body, request_token)=>{
    const query = "SELECT * FROM emp;";
    console.log(db.cassandraClient);
    db.cassandraClient().execute(query, (error, result)=>{
        if (error){
            console.log('this error');
            console.error(error);
            console.log('that error');
        } else
            console.log(result.rows[0])
    });
    console.log('get handler is called');
});

mqtt_router.on('unknown', (body, request_token)=>{
    console.error('The unknown action is called');
});


module.exports = mqtt_router;