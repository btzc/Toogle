const app_controller = require('./controllers/appController');
const user_controller = require('./controllers/userController');
const auth = require('./middleware/auth');

module.exports.ACTIONS = {
  "GET": "GET",
  "POST": "POST",
  "PUT": "PUT",
  "DELETE": "DELETE"
};

module.exports.ROUTES = {
  "GET": {
    "/app": {
      "controller": app_controller.index,
      "middleware": auth
    }
  },
  "POST": {
    "/tasks/task": {
      "controller": app_controller.insertTask,
      "middleware": auth
    },
    "/users": user_controller.createUser,
    "/users/login": user_controller.login
  },
  "PUT": {
    "/tasks/task": {
      "controller": app_controller.updateTask,
      "middleware": auth
    }
  },
  "DELETE": {
    "/tasks/task": {
      "controller": app_controller.deleteTask,
      "middleware": auth
    }
  }
}

module.exports.MONGO_URL = 'mongodb://localhost:27017';
module.exports.DB_NAME = 'toogle';

module.exports.JWT_HEADER = {
  alg: 'RS256',
  typ: 'JWT'
};
