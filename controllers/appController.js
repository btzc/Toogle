const utils = require('../utils');

module.exports.index = (req, res) => {
  const statusCode = 200;
  const headers = {
    'Content-Type': 'text/plain'
  };
  const data = 'Hello, World\n';
  utils.sendResponse(res, statusCode, headers, data);
}

module.exports.test = (req, res) => {
  utils.parseData(req, res);
}
