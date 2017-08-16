var mqtt_router = require('../../lib/mqtt-router');
var moment = require('moment');
const logger = require('../../log/log');
const logController = require('./../../controller/log');

mqtt_router.on('log', (body, request_token)=>{
    logController.logToCassandra(body).
    then(()=>{}).
    catch((error)=>logger.log('error', error));

    logController.logToInflux(body).
    then(()=>console.log('this is add')).
    catch((error)=>logger.log('error', error));

//	db.influxClient().query('insert logs,device_id=10 temp=2.3,humidity=3.4');
});

mqtt_router.on('get', (body, request_token)=>{

});

mqtt_router.on('unknown', (body, request_token)=>{
    logger.log('error', 'The unknown action is called')
});


module.exports = mqtt_router;
