var mqtt_router = require('./mqtt-router');
var moment = require('moment');

const db = require('./../database/database');

mqtt_router.on('log', (body, request_token)=>{
    const query = "INSERT INTO logs (timestamp, nanoseconds, device_id, states) VALUES (?,?,?,?)";
    let nanoseconds = process.hrtime()[1];
    let timestamp = moment().unix();
    let parameter = [timestamp, nanoseconds, body.device_id, body.states];
    db.cassandraClient().execute(query, parameter, {prepare:true}, (error)=>{
<<<<<<< HEAD
		if (error) {
        	console.error(error);
    		console.log('log handler is called');
		}
=======
        console.error(error);
    	console.log('log handler is called');
>>>>>>> 4f72216f47d21b8d4bf448478aa304e6b4a5ae5c
    });

	db.influxClient().writePoints([
		{
			measurement: "logs",
		   	tags: {
				device_id: body.device_id
			},
			fields: {
				temp: body.states.temp,
				humidity: body.states.humidity
			}
		}
	]).then(() => {
		console.log('successfully inserted');
		db.influxClient().query('select * from logs');
	}).catch(err => {
		console.log(err);
	})

//	db.influxClient().query('insert logs,device_id=10 temp=2.3,humidity=3.4');
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
