const { Board } = require('../resources/boards/boards.model');

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

// DB.push(new Board());

const getAll = async () => {
  //ch2
  try {
    if (!DB) {
      const error = new Error('BD not found');
      error.status = 404;
      throw error;
    }
    return DB;
  } catch (error) {
    _wrErrors(error);
  }
};

const getById = async id => {
  //ch2
  try {
    const board = DB.filter(item => item.id === id)[0];
    if (!board) {
      const error = new Error('Board not found');
      error.status = 404;
      throw error;
    }
    return board;
  } catch (error) {
    _wrErrors(error);
  }
};

const create = async data => {
  //ch2
  try {
    const board = new Board({
      title: data.title,
      columns: data.columns
    });
    DB.push(board);
    return board;
  } catch (error) {
    _wrErrors(error);
  }
};

const updateById = async (id, body) => {
  //ch2
  try {
    const board = await DB.filter(board => board.id === id)[0];
    if (!board) {
      const error = new Error('Board not found');
      error.status = 404;
      throw error;
    }
    board.title = body.title;
    body.columns.forEach(elem1 => {
      const index = board.columns.findIndex(elem2 => elem2.id === elem1.id);
      if (index === -1) {
        const error = new Error('Column id not found');
        error.status = 404;
        throw error;
        // board.columns[index] = elem1;
      }
    });
    board.columns = body.columns;

    return board;
  } catch (error) {
    _wrErrors(error);
  }
};
const isHaveColumns = async (boardId, columnId) => {
  //ch2
  try {
    const board = await DB.findIndex(board => board.id === boardId);
    if (board === -1) {
      const error = new Error('Board not found');
      error.status = 404;
      throw error;
    }
    const column = DB[board].columns.findIndex(column => column.id === columnId);
    if (column === -1) {
      const error = new Error('Column not found');
      error.status = 404;
      throw error;
    }
    return true;
  } catch (error) {
    _wrErrors(error);
  }
};

const deleteById = async id => {
  //ch2
  try {
    const index = DB.findIndex(elem => elem.id === id);
    if (index === -1) {
      const error = new Error('Board not found');
      error.status = 404;
      throw error;
    }
    DB.splice(index, 1);
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
  isHaveColumns
};
