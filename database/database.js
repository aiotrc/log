const Promise = require('bluebird');
const Cassandra = require('cassandra-driver');
const Influx = require('influx');
<<<<<<< HEAD
=======
const influxClient = new Influx.InfluxDB({
	host : 'localhost',
	database : 'i1820',
	schema : [
		{
			measurment : 'logs'
		}
	]
});

>>>>>>> 4f72216f47d21b8d4bf448478aa304e6b4a5ae5c
const config = require('./../config');
var cassandraClient;
var influxClient;

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

<<<<<<< HEAD

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
				influxClient = client;
				resolve(client);
			})
			.catch(err => {
				error(err);
			});
	});
};


=======
>>>>>>> 4f72216f47d21b8d4bf448478aa304e6b4a5ae5c
module.exports.cassandraClient = ()=> cassandraClient;
module.exports.influxClient = ()=> influxClient;
