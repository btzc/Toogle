const database = require('../database');

class Task {
  constructor( description, timestamp, user ) {
    this._id = database.generateObjectId || null,
    this.description = description || null,
    this.timestamp = timestamp || null,
    this.user = user || null
  }

  format = () => {
    this.timestamp = database.createTimestamp(this.timestamp);
    this.user = database.createObjectId(this.user);
  }
}

module.exports.Task = Task;
