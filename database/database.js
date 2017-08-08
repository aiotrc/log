const Promise = require('bluebird');
const Cassandra = require('cassandra-driver');
const Influx = require('influx');

const config = require('./../config');


var cassandraClient;
var _influxClient;

module.exports.cassandraConnect = ()=>{
    const client = new Cassandra.Client({ contactPoints: [config.cassandra.hostname + ':' + config.cassandra.port],
        keyspace: config.cassandra.key_space });
    return new Promise((resolve, error) => {
        client.connect((err)=>{
            if (err) error(err);
            else{
                cassandraClient = client;
                resolve(client);
            }

        });
    });
};



module.exports.influxConnect = ()=> {
	const client = new Influx.InfluxDB({
		host: config.influx.hostname,
		database: config.influx.database,
		port: config.influx.port
	});
	return new Promise((resolve, error) => {
		client.getDatabaseNames()
			.then (names => {
				if (!names.includes(config.influx.database)) {
					return client.createDatabase(config.influx.database);
				}

			})
			.then (() => {
				_influxClient = client;
				resolve(client);
			})
			.catch(err => {
				error(err);
			});
	});
};




module.exports.cassandraClient = ()=> cassandraClient;
module.exports.influxClient = ()=> _influxClient;
