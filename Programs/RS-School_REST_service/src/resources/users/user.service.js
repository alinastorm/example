const repo = require('./user.memory.repository');
const tasksService = require('../tasks/tasks.service');

const getAll = () => repo.getAll();
const getById = id => repo.getById(id);
const getByColumnId = id => repo.getByColumnId(id);
const create = data => repo.create(data);
const updateById = (id, body) => repo.updateById(id, body);
const deleteById = id => repo.deleteById(id);

module.exports = { getAll, getById, create, updateById, deleteById,getByColumnId };
