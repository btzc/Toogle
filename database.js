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

module.exports.findDocument = async (collection_name, query = {}) => {
  const client = open();
  let resp;

  try {
    await client.connect();
    console.log("Connected to server");

    const db = client.db(constants.DB_NAME);
    const collection = db.collection(collection_name);

    resp = await collection.findOne(query);
  } catch(err) {
    console.log(err);
    resp = err;
  }

  client.close();
  return resp;
}

module.exports.findDocuments = async (collection_name, query = {}) => {
  const client = open();
  let resp;
  
  try {
    await client.connect();
    console.log("Connected to server");
    
    const db = client.db(constants.DB_NAME);
    const collection = db.collection(collection_name);

    resp = await collection.find(query).toArray();
  } catch(err) {
    console.log(err);
    resp = err;
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
    resp = err;
  }

  client.close();
  return resp;
}

module.exports.updateDocument = async (doc = {}, query = {}, collection_name) => {
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
    resp = err;
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
    resp = err;
  }

  client.close();
  return resp;
}

module.exports.findAndInsertDocument = async (doc = {}, query = {}, collection_name) => {
  const client = open();
  let resp;
  try {
    await client.connect();
    console.log("Connected to server");

    const db = client.db(constants.DB_NAME);
    const collection = db.collection(collection_name);

    if (await collection.findOne(query)) {
      throw new Error("Email is already in use");
    }

    resp = await collection.insertOne(doc);
  } catch(err) {
    console.log(err);
    resp = err;
  }

  client.close();
  return resp;
}
