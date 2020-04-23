const MongoClient = require('mongodb').MongoClient;
const constants = require('./constants');

const url = 'mongodb://localhost:27017'
const options = {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}
const client = new MongoClient(url, options);

module.exports.open = () => {
  return new Promise((resolve, reject) => {
    client.connect((err) => {
      if (err) {
        reject(err);
      }

      resolve(client);
    });
  });
}

module.exports.close = () => {
  client.close();
}
