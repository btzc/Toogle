const consts = require('./constants');
const utils = require('./helpers/utils');

const findRoutes = (pathname, action, isBool) => {
  if (!isBool) {
    return consts.ROUTES[action][pathname];
  } else {
    let split = pathname.split('/');
    split.pop();
    pathname = split.join('/');

    return consts.ROUTES[action][pathname];
  }
}

const isPutOrDelete = (action) => {
  return (action === 'PUT' || action === 'DELETE') ? true : false;
}

module.exports = (req, res, pathname, action) => {
  const bool = isPutOrDelete(action);
  const route = findRoutes(pathname, action, bool);

  if (route && bool) {
    const split = pathname.split('/');
    route(req, res, split[split.length-1]);
  } else if (route && !bool) {
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