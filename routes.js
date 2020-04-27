const consts = require('./constants');
const utils = require('./helpers/utils');

const findRoutes = (pathname, action, hasId, req) => {
  if (!hasId) {
    return consts.ROUTES[action][pathname];
  } else {
    let split = pathname.split('/');
    req.id = split.pop();
    pathname = split.join('/');

    return consts.ROUTES[action][pathname];
  }
}

const isPutOrDelete = (action) => {
  return (action === 'PUT' || action === 'DELETE') ? true : false;
}

module.exports = (req, res, pathname, action) => {
  const hasId = isPutOrDelete(action);
  const route = findRoutes(pathname, action, hasId, req);
  const middleware = route.middleware;

  if (route && !middleware) {
    route(req, res)
  } else if (route.controller && middleware) {
    middleware(req, res, route.controller);
  } else {
    const statusCode = 404;
    const headers = {
      'Content-Type': 'text/plain'
    };
    const data = 'Bad Method\n';
    utils.sendResponse(res, statusCode, headers, data);
  }
}