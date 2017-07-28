const Promise = require('bluebird');
const Cassandra = require('cassandra-driver');

let cassandraClient;

module.exports.cassandraConnect = ()=>{
    const client = new Cassandra.Client({ contactPoints: ['localhost:9042'] , keyspace: 'i1820' });
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

module.exports.cassandraClient = cassandraClient;