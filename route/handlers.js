var mqtt_router = require('./mqtt-router');

mqtt_router.on('log', (body, request_token)=>{
    console.log('log handler is called');
});

mqtt_router.on('get', (body, request_token)=>{
    console.log('get handler is called');
});

mqtt_router.on('unknown', (body, request_token)=>{
    console.error('The unknown action is called');
});
