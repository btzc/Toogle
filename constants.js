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
    "/tasks/task": app_controller.insertTask
  },
  "PUT": {
    "/tasks/task": app_controller.updateTask
  },
  "DELETE": {
    "/tasks/task": app_controller.deleteTask
  },
}

module.exports.MONGO_URL = 'mongodb://localhost:27017';
module.exports.DB_NAME = 'toogle';
