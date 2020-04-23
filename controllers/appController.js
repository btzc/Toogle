const utils = require('../utils');
const ObjectId = require('mongodb').ObjectID;
const database = require('../database');
const constants = require('../constants');

const writeToDB = (doc) => {
  return database.open()
    .then((client) => {
      const db = client.db(constants.DB_NAME);

      return db.collection('tasks');
    })
    .then(tasks => {
      return tasks.insertOne(doc)
    })
    .then(res => {
      database.close();
      return res;
    })
    .catch(err => {
      console.log(err);
      return new Error(err);
    });
}

const insertDocument = (db, collection_name, doc) => {
  const collection = db.collection(collection_name);

  collection.insertOne(doc);
}

module.exports.index = (req, res) => {
  const statusCode = 200;
  const headers = {
    'Content-Type': 'text/plain'
  };
  const data = 'Hello, World\n';
  
  utils.sendResponse(res, statusCode, headers, data);
}

module.exports.task = (req, res) => {
  utils.parseData(req,res)
    .then(doc => {
      doc.date = new Date(doc.date).toISOString();
      doc._id = new ObjectId();

      return doc;
    })
    .then(async (doc) => {
      await writeToDB(doc);

      const statusCode = 201;
      const headers = {
        'Content-Type': 'text/plain'
      };
      const data = 'Successfully Written\n';
      
      utils.sendResponse(res, statusCode, headers, data);
    })
    .catch(err => {

      const statusCode = 400;
      const headers = {
        'Content-Type': 'text/plain'
      };
      const data = err;
      
      utils.sendResponse(res, statusCode, headers, data);
    });
}
