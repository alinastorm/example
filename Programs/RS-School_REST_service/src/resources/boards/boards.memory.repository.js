const DB = require('../../common/dbBoards_mock');

const getAll = async () => DB.getAll();

const getById = async id => DB.getById(id);

const create = async data => DB.create(data);

const updateById = async (id, body) => DB.updateById(id, body);

const deleteById = async id => DB.deleteById(id);

const isHaveColumns = async (boardId, columnId) => DB.isHaveColumns(boardId, columnId);  
// const getTasks = async id => DB.getTasks(id);

module.exports = { getAll, getById, create, updateById, deleteById,isHaveColumns };
