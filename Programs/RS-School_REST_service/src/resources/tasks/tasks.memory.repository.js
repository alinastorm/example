const DB = require('../../common/dbTasks_mock');

const getAll = async () => DB.getAll();
const getById = async id => DB.getById(id);
const getByBoardId = async id => DB.getByBoardId(id);
const create = async data => DB.create(data);
const updateById = async (id, body) => DB.updateById(id, body);
const deleteById = async id => DB.deleteById(id);
const deleteByBoardId = async id => DB.deleteByBoardId(id);
const deleteByUserId = async id => DB.deleteByUserId(id);
const deleteByBoardIdTaskId = async data => DB.deleteByBoardIdTaskId(data);
const isDeleteById = async id => DB.isDeleteById(id);
const getByColumnId = async data => DB.getByColumnId(data);
const getByBoardIdTaskId = async data => DB.getByBoardIdTaskId(data);
const updateByBoardIdTaskId = async data => DB.updateByBoardIdTaskId(data);
const updateUserToNull = async id => DB.updateUserToNull(id);

module.exports = {
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
