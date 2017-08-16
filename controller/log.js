const db = require('./../database/database');
var moment = require('moment');
const logger = require('./../log/log');
const Promise = require('bluebird');

class LogController{
    constructor(){}

    logToCassandra(body){
        return new Promise((resolve, reject)=>{
            const query = "INSERT INTO logs (timestamp, nanoseconds, device_id, states) VALUES (?,?,?,?)";
            let nanoseconds = process.hrtime()[1];
            let timestamp = moment().unix();
            let parameter = [timestamp, nanoseconds, body.device_id, body.states];
            db.cassandraClient().execute(query, parameter, {prepare:true}, (error)=>{
                if (error) reject(error);
                else reject(error);
            });
        });
    }

    logToInflux(body){
        return db.influxClient().writePoints([
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
        ]);
    }

    getLogsFromCassandra(top){
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM logs LIMIT ?;";

            db.cassandraClient().execute(query, [top], {prepare:true},(error, result)=>{
                if (error) reject(error);
                else resolve(result.rows);
            });
        });
    }

    getLogsFromInflux(){
        return db.influxClient().query('select * from logs');
    }


}

module.exports = new LogController();