const DB = require('../../common/dbUsers_mock');

const getAll = () => DB.getAll();

const getById = async id => DB.getById(id);

const create = async data => DB.create(data);

const updateById = async (id, body) => DB.updateById(id, body);

const deleteById = async id => DB.deleteById(id);

module.exports = { getAll, getById, create, updateById, deleteById };
