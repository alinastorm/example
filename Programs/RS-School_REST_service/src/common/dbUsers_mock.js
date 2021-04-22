const { User } = require('../resources/users/user.model');

// ch2.1;
// try {
//   if ('') {
//     error = new Error('Board not found');
//     error.status = 404;
//     throw error;
//   }
// } catch (error) {
//   if (!error.status) {
//     error.status = 500;
//     error.description = error;
//     error.message = '500 Internal Server Error';
//   }
// }

const _wrErrors = error => {
  // if (!error.status) {
  //   error.status = 500;
  //   error.description = error;
  //   error.message = '500 Internal Server Error';
  // }
  throw error;
};

const DB = [];

// DB.push(new User());

const getAll = () => {
  //ch2
  try {
    return DB;
  } catch (error) {
    _wrErrors(error);
  }
};

const getById = async id => {
  //ch2
  try {
    const user = await DB.filter(item => item.id === id)[0];
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    return user;
  } catch (error) {
    _wrErrors(error);
  }
};

const create = async data => {
  //ch2
  try {
    const user = new User({
      name: data.name,
      login: data.login,
      password: data.password
    });
    DB.push(user);
    return user;
  } catch (error) {
    _wrErrors(error);
  }
};

const updateById = async (id, body) => {
  //ch2
  try {
    const user = DB.filter(user => user.id === id)[0];
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    user.name = body.name;
    user.login = body.login;
    user.password = body.password;
    return user;
  } catch (error) {
    _wrErrors(error);
  }
};
const deleteById = async id => {
  //ch2
  try {
    const index = DB.findIndex(elem => elem.id === id);
    if (index == -1) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    DB.splice(index, 1);
    return true;
  } catch (error) {
    _wrErrors(error);
  }
};

module.exports = { DB, getAll, getById, create, updateById, deleteById };
