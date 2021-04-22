const tasksService = require('../tasks/tasks.service');
const repo = require('./boards.memory.repository');

const getAll = () => repo.getAll();
const getById = id => repo.getById(id);
const create = data => repo.create(data);
const updateById = (id, body) => repo.updateById(id, body);
const deleteById = id =>repo.deleteById(id);
const isHaveColumns = (boardId, columnId) =>repo.isHaveColumns(boardId, columnId);

// const getTasks = id => repo.getTasks(id);

module.exports = { getAll, getById, create, updateById, deleteById,isHaveColumns };
