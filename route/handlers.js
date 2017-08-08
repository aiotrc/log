var mqtt_router = require('./mqtt-router');
var moment = require('moment');
const logger = require('./../log/log');

const db = require('./../database/database');

mqtt_router.on('log', (body, request_token)=>{
    const query = "INSERT INTO logs (timestamp, nanoseconds, device_id, states) VALUES (?,?,?,?)";
    let nanoseconds = process.hrtime()[1];
    let timestamp = moment().unix();
    let parameter = [timestamp, nanoseconds, body.device_id, body.states];
    db.cassandraClient().execute(query, parameter, {prepare:true}, (error)=>{
		if (error) logger.log('error', error);
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
	]).
	then(() => db.influxClient().query('select * from logs')).
	catch(err => logger.log('error', err));

//	db.influxClient().query('insert logs,device_id=10 temp=2.3,humidity=3.4');
});

mqtt_router.on('get', (body, request_token)=>{
    const query = "SELECT * FROM emp;";
    console.log(db.cassandraClient);
    db.cassandraClient().execute(query, (error, result)=>{
        if (error){
            logger.log('error', error)
        } else
            console.log(result.rows[0])
    });
    console.log('get handler is called');
});

mqtt_router.on('unknown', (body, request_token)=>{
    logger.log('error', 'The unknown action is called')
});


module.exports = mqtt_router;
