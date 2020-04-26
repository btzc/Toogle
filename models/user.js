const jwt = require('../helpers/jwt');
const consts = require('../constants');
const database = require('../database');
const crypto = require('crypto');

class User {
  constructor(username, password, _id = null) {
    this._id = _id || database.createObjectId();
    this.username = username || null;
    this.password = password || null;
  }

  validateUsername = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.username);
  }

  generateJWT = () => {
    let date = new Date();
    date.setHours(date.getHours() + 2);
    const exp = Math.round(date.getTime() / 1000);

    const payload = {
      id: this._id,
      iat: new Date(),
      exp: exp
    };

    return jwt.generateToken(consts.JWT_HEADER, payload);
  }

  generateSalt = (length) => {
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0, length);
  }

  sha256 = (password, salt) => {
    let hash = crypto.createHmac('sha256', salt);
    hash.update(password);

    return hash.digest('hex');
  }

  saltAndHashPassword = () => {
    const salt = this.generateSalt(this.password.length);
    const saltedAndHashedPassword = this.sha256(this.password, salt);
    this.password = `${salt}$${saltedAndHashedPassword}`;
  }

  verifyPassword = (password) => {
    const salt = this.password.split('$')[0];
    const submittedPassword = this.password.split('$')[1];
    const saltedAndHashedPassword = this.sha256(password, salt);

    return (submittedPassword === saltedAndHashedPassword);
  }
}

module.exports.User = User;
