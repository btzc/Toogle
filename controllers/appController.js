const utils = require('../helpers/utils');
const database = require('../database');

module.exports.index = async (req, res) => {
  try {
    const collection_name = 'tasks';
    const resp = await database.findDocuments(collection_name);
    if (resp instanceof Error) {
      throw new Error(resp);
    }
    const data = JSON.stringify(resp);
    
    const statusCode = 200;
    const headers = {
      'Content-Type': 'text/plain'
    };
    
    utils.sendResponse(res, statusCode, headers, data);
  } catch (err) {
    const statusCode = 400;
    const headers = {
      'Content-Type': 'text/plain'
    };
    const data = 'Can\'t fetch tasks';
    
    utils.sendResponse(res, statusCode, headers, data);
  }
}

module.exports.insertTask = (req, res) => {
  utils.parseData(req, res)
    .then((doc) => {
      doc._id = database.generateObjectId();
      doc.timestamp = database.createTimestamp(doc.timestamp);

      return doc;
    })
    .then(async (doc) => {
      const collection_name = 'tasks';

      const resp = await database.insertDocument(doc, collection_name);
      if (resp instanceof Error) {
        throw new Error(resp);
      }

      const statusCode = 201;
      const headers = {
        'Content-Type': 'text/plain'
      };
      const data = 'Successfully Written\n';
      
      utils.sendResponse(res, statusCode, headers, data);
    })
    .catch((err) => {
      const statusCode = 400;
      const headers = {
        'Content-Type': 'text/plain'
      };
      const data = {
        "message": err.message
      };
      utils.sendResponse(res, statusCode, headers, JSON.stringify(data));
    });
}

module.exports.updateTask = (req, res, id) => {
  utils.parseData(req, res)
    .then(async (doc) => {
      const query = {
        "_id": database.createObjectId(id)
      };

      const collection_name = 'tasks';
      
      const resp = await database.updateDocument(doc, query, collection_name);
      if (resp instanceof Error) {
        throw new Error(resp);
      }

      const statusCode = 200;
      const headers = {
        'Content-Type': 'text/plain'
      };
      const data = 'Successfully Updated\n';
      
      utils.sendResponse(res, statusCode, headers, data);
    })
    .catch((err) => {
      const statusCode = 400;
      const headers = {
        'Content-Type': 'text/plain'
      };
      const data = {
        "message": err.message
      };
      utils.sendResponse(res, statusCode, headers, JSON.stringify(data));
    });
}

module.exports.deleteTask = async (req, res, id) => {
  try {
    const collection_name = 'tasks';
    const query = {
      "_id": database.createObjectId(id)
    };

    const resp = await database.deleteDocument(query, collection_name);
    if (resp instanceof Error) {
      throw new Error(resp);
    }
    
    const statusCode = 200;
    const headers = {
      'Content-Type': 'text/plain'
    };
    const data = "Successfully Deleted\n"
    
    utils.sendResponse(res, statusCode, headers, data);
  } catch (err) {
    const statusCode = 400;
    const headers = {
      'Content-Type': 'text/plain'
    };
    const data = 'Can\'t fetch tasks';
    
    utils.sendResponse(res, statusCode, headers, data);
  }
}
