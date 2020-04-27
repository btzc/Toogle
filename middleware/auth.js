const jwt = require('../helpers/jwt');
const database = require('../database');
const utils = require('../helpers/utils');

module.exports = async (req, res, next) => {
  try {
    const header = req.headers['authorization'];

    if (!header) {
      throw new Error('You are not authorized to access this resource');
    }
    const token = header.split(' ')[1];
    const data = jwt.verifyToken(token);

    if (data instanceof Error) {
      throw new Error('You are not authorized to access this resource');
    }

    const collection_name = 'users';
    const query = {
      "_id": database.createObjectId(data.id)
    };
    const user = await database.findDocument(collection_name, query);

    req.user = user;
    req.token = token;
    next(req, res);
  } catch(err) {
    const statusCode = 401;
    const headers = {
      'Content-Type': 'text/plain'
    };
    const data = err.message;
    utils.sendResponse(res, statusCode, headers, data);
  }
};