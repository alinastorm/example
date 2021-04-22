const {Task} = require('../resources/tasks/tasks.model');
const boardsService = require('../resources/boards/boards.service');
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

//wraperErrors
const _wrErrors = error => {
  // if (!error.status) {
  //   error.status = 500;
  //   error.description = error;
  //   error.message = '500 Internal Server Error';
  // }
  throw error;
};

const DB = [];

const getAll = async () => DB;

const getById = async id => {
  //ch2
  try {
    const task = DB.filter(elem => elem.id === id)[0];
    if (!task) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }
    return task;
  } catch (error) {
    _wrErrors(error);
  }
};

const create = async data => {
  //ch2 вопрос
  try {
    const task = await new Task({ ...data });
    DB.push(task);
    return await getById(task.id);
  } catch (error) {
    _wrErrors(error);
  }
};

const updateById = async (id, body) => {
  //ch2
  try {
    const item = DB.filter(elem => elem.id === id)[0];
    if (!item) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }
    item.title = body.title;
    item.columns = body.columns;
    return item;
  } catch (error) {
    _wrErrors(error);
  }
};

const deleteById = async id => {
  //ch2
  try {
    const item = DB.findIndex(elem => elem.id === id);
    if (item == -1) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }
    return DB.splice(item, 1);
  } catch (error) {
    _wrErrors(error);
  }
};

const getByBoardId = async boardId => {
  //ch2
  try {
    const items = DB.filter(elem => elem.boardId === boardId);
    return items;
  } catch (error) {
    _wrErrors(error);
  }
};
const getByColumnId = async id => {
  //ch2
  try {
    const items = DB.filter(elem => elem.columnId === id);
    if (!item) {
      const error = new Error('Task with columnId not found');
      error.status = 404;
      throw error;
    }
    return items;
  } catch (error) {
    _wrErrors(error);
  }
};

const getByBoardIdTaskId = async data => {
  //ch2
  try {
    const item = DB.filter(
      elem => elem.boardId === data.boardId && elem.id === data.taskId
    )[0];

    if (!item) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }
    return item
  } catch (error) {
    _wrErrors(error);
  }
};

const updateByBoardIdTaskId = async data => {
  //ch2
  try {
    const item = await DB.filter(
      elem =>
        elem.boardId === data.params.boardId && elem.id === data.params.taskId
    )[0];

    if (!item) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }
    item.title = data.body.title;
    item.order = data.body.order;
    item.description = data.body.description;
    item.userId = data.body.userId;
    item.boardId = data.params.boardId;
    item.columnId = data.body.columnId;
    return item;
  } catch (error) {
    _wrErrors(error);
  }
};

const updateUserToNull = async id => {
  //ch2
  try {
    return DB.forEach(elem => {
      if (elem.userId === id) {
        elem.userId = null;
      }
    });
  } catch (error) {
    _wrErrors(error);
  }
};

const deleteByBoardId = async id => {
  //ch2
  try {
    const elems = DB.filter(elem => !elem.boardId === id);
    DB.splice(0, DB.length, ...elems);
    return true;
  } catch (error) {
    _wrErrors(error);
  }
};
const isDeleteById = async id => {
  //ch2
  try {
    const index = DB.findIndex(elem => elem.id === id);
    if (!index === -1) {
      const error = new Error('Task not delete');
      error.status = 500;
      throw error;
    }
    return true;
  } catch (error) {
    _wrErrors(error);
  }
};
const deleteByUserId = async id => {
  //ch2
  try {
    const elems = DB.filter(elem => elem.userId === id);
    DB = elems;
    return true;
  } catch (error) {
    _wrErrors(error);
  }
};

const deleteByBoardIdTaskId = async data => {
  //ch2
  try {
    const item = DB.findIndex(
      elem => elem.id === data.taskId && elem.boardId === data.boardId
    );
    if (item === -1) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }
    DB.splice(item, 1);
    return true;
  } catch (error) {
    _wrErrors(error);
  }
};

module.exports = {
  DB,
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  isDeleteById,
  getByBoardId,
  getByColumnId,
  getByBoardIdTaskId,
  deleteByUserId,
  updateByBoardIdTaskId,
  deleteByBoardId,
  deleteByBoardIdTaskId,
  updateUserToNull
};
