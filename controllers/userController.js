const utils = require('../helpers/utils');
const User = require('../models/user');
const database = require('../database');

module.exports.createUser = (req, res) => {
  utils.parseData(req, res)
    .then((doc) => {
      const {username, password} = doc;

      let user = new User.User(username, password);
      user.saltAndHashPassword();

      if (!user.validateUsername()) {
        throw new Error('invalid email address');
      }
    
      return user;
    })
    .then(async (user) => {
      const collection_name = 'users';
      const query = {
        "username": user.username
      };
      const resp = await database.findAndInsertDocument(user, query, collection_name);
      if (resp instanceof Error) {
        throw new Error(resp);
      }
      const statusCode = 202;
      const headers = {
        'Content-Type': 'text/plain'
      };
      user.password = null;
      let data = {
        "user": user,
        "token": user.generateJWT()
      };
      data = JSON.stringify(data);

      utils.sendResponse(res, statusCode, headers, data);
    })
    .catch(err => {
      const statusCode = 400;
      const headers = {
        'Content-Type': 'text/plain'
      };
      const data = err.message;
      
      utils.sendResponse(res, statusCode, headers, data);
    });
}

module.exports.login = (req, res) => {
  utils.parseData(req, res)
    .then(async (doc) => {
      let {username, password} = doc;
      console.log(username);
      const collection_name = 'users';
      const query = {
        "username": username
      };

      const resp = await database.findDocument(collection_name, query);
      if (resp instanceof Error) {
        throw new Error("User credentials were incorrect, please try again");
      }
      const user = new User.User(resp.username, resp.password, resp._id);

      const isCorrectPassword = user.verifyPassword(password);
      if (!isCorrectPassword) {
        throw new Error("User credentials were incorrect, please try again");
      }

      const statusCode = 200;
      const headers = {
        'Content-Type': 'text/plain'
      };
      user.password = null;
      let data = {
        "user": user,
        "token": user.generateJWT()
      };
      data = JSON.stringify(data);

      utils.sendResponse(res, statusCode, headers, data);
    })
    .catch(err => {
      const statusCode = 400;
      const headers = {
        'Content-Type': 'text/plain'
      };
      const data = err.message;
      
      utils.sendResponse(res, statusCode, headers, data);
    });
}
