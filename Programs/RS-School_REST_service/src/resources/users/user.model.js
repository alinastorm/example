const uuidv5 = require('uuid');
const Joi = require('joi');

class User {
  constructor({name, login, password } = {}) {
    this.id = uuidv5();
    this.name = name;
    this.login = login;
    this.password = password;
    this.ver = process.env.npm_package_version;
    this.type = 'user';
  }

  toResponse() {
    // const { id, name, login } = user;
    return { id: this.id, name: this.name, login: this.login };
  }
}
const schemaUserNull = Joi.object({})

const schemaUserId = Joi.object({
  userId: Joi.string()
    .guid()
    .required()
});

const schemaUser = Joi.object({
  id: Joi.string()
  .guid(),
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required()
});

// let schema = Joi.string().empty('');
// schema.validate(''); // returns { error: null, value: undefined }
// schema = schema.empty();
// schema.validate(''); // returns { error: "value" is not allowed to be empty, value: '' }

module.exports = { User, schemaUserNull, schemaUser, schemaUserId };
