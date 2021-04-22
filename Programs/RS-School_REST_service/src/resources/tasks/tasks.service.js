const repo = require('./tasks.memory.repository');

const getAll = () => repo.getAll();
const getById = id => repo.getById(id);
const getByBoardId = id => repo.getByBoardId(id);
const create = data => repo.create(data);
const updateById = (id, body) => repo.updateById(id, body);

const deleteById = id => repo.deleteById(id);
const deleteByBoardId = id => repo.deleteByBoardId(id);
const deleteByUserId = id => repo.deleteByUserId(id);
const isDeleteById = id => repo.isDeleteById(id);
const deleteByBoardIdTaskId = data => repo.deleteByBoardIdTaskId(data);

const getByBoardIdTaskId = data => repo.getByBoardIdTaskId(data);
const updateByBoardIdTaskId = data => repo.updateByBoardIdTaskId(data);
const updateUserToNull = id => repo.updateUserToNull(id);

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  isDeleteById,
  getByBoardId,
  getByBoardIdTaskId,
  deleteByUserId,
  updateByBoardIdTaskId,
  deleteByBoardId,
  deleteByBoardIdTaskId,
  updateUserToNull
};
