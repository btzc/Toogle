const routes = require('./routes');
const consts = require('./constants');
const utils = require('./utils');

const checkAction = (action) => {
  return consts.ACTIONS[action];
}

module.exports = (req, res) => {
  const url = new URL(`http://${req.headers.host}${req.url}`);
  const pathname = url.pathname;
  const method = req.method;
  if (checkAction(method)) {
    routes(req, res, pathname, method);
  } else {
    const statusCode = 404;
    const headers = {
      'Content-Type': 'text/plain'
    };
    const data = 'Bad Method\n';
    utils.sendResponse(res, statusCode, headers, data);
  }
};
