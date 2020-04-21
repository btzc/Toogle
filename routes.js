const consts = require('./constants');
const utils = require('./utils');

const findRoutes = (pathname, action) => {
  return consts.ROUTES[action][pathname];
}

module.exports = (req, res, pathname, action) => {
  const route = findRoutes(pathname, action);
  if (route) {
    route(req, res);
  } else {
    const statusCode = 404;
    const headers = {
      'Content-Type': 'text/plain'
    };
    const data = 'Bad Method\n';
    utils.sendResponse(res, statusCode, headers, data);
  }
}