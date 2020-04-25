const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const Timestamp = require('mongodb').Timestamp;

const constants = require('./constants');

const open = () => {
  const url = 'mongodb://localhost:27017'
  const options = {
    "useNewUrlParser": true,
    "useUnifiedTopology": true
  }
  const client = new MongoClient(url, options);

  return client;
}

module.exports.generateObjectId = () => {
  return new ObjectId();
}

module.exports.createObjectId = (id) => {
  return new ObjectId(id);
}

module.exports.createTimestamp = (timestamp) => {
  return new Timestamp(timestamp);
}

module.exports.getDocuments = async (collection_name, params = {}) => {
  const client = open();
  let resp;
  
  try {
    await client.connect();
    console.log("Connected to server");
    
    const db = client.db(constants.DB_NAME);
    const collection = db.collection(collection_name);

    resp = await collection.find(params).toArray();
  } catch(err) {
    console.log(err);
    resp = err.stack;
  }

  client.close();
  return resp;
}

module.exports.insertDocument = async (doc, collection_name) => {
  const client = open();
  let resp;
  
  try {
    await client.connect();
    console.log("Connected to server");
    
    const db = client.db(constants.DB_NAME);
    const collection = db.collection(collection_name);

    resp = await collection.insertOne(doc);
  } catch(err) {
    console.log(err);
    resp = err.stack;
  }

  client.close();
  return resp;
}

module.exports.updateDocument = async (doc = {}, query = {}, collection_name, ) => {
  const client = open();
  let resp;
  
  try {
    await client.connect();
    console.log("Connected to server");
    
    const db = client.db(constants.DB_NAME);
    const collection = db.collection(collection_name);
    
    resp = await collection.updateOne(query, {$set: doc});
  } catch(err) {
    console.log(err);
    resp = err.stack;
  }

  client.close();
  return resp;
}

module.exports.deleteDocument = async (query = {}, collection_name, ) => {
  const client = open();
  let resp;

  try {
    await client.connect();
    console.log("Connected to server");
    
    const db = client.db(constants.DB_NAME);
    const collection = db.collection(collection_name);
    
    resp = await collection.deleteOne(query);
  } catch(err) {
    console.log(err);
    resp = err.stack;
  }

  client.close();
  return resp;
}
