const http = require('http');
const handler = require('./handler');
const MongoClient = require('mongodb').MongoClient;

const dbName = 'toogle';
const url = `mongodb://localhost:27017/${dbName}`;

const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function(err) {
  console.log(`Connected successfully to server`);
  client.close();
});

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer(handler);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
