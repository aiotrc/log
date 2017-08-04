const Promise = require('bluebird');
const Cassandra = require('cassandra-driver');
const Influx = require('influxdb-nodejs');
const influxClient = new Influx('http://127.0.0.1:8086/i1820');
const config = require('./../config');
var cassandraClient;

module.exports.cassandraConnect = ()=>{
    const client = new Cassandra.Client({ contactPoints: [config.cassandra.hostname + ':' + config.cassandra.port],
        keyspace: config.cassandra.key_space });
    return new Promise((resolve, error) => {
        client.connect((err)=>{
            if (err) error(error);
            else{
                cassandraClient = client;
                resolve(client);
            }

        });
    });
};

module.exports.cassandraClient = ()=> cassandraClient;
module.exports.influxClient = ()=> influxClient;
