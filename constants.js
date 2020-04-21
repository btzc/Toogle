const app_controller = require('./controllers/appController');

module.exports.ACTIONS = {
  "GET": "GET",
  "POST": "POST",
  "PUT": "PUT",
  "DELETE": "DELETE"
};

module.exports.ROUTES = {
  "GET": {
    "/app": app_controller.index
  },
  "POST": {
    "/test": app_controller.test
  },
  "PUT": {},
  "DELETE": {},
}
