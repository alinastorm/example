const uuidv5 = require('uuid');
const Joi = require('joi');

class Task {
  constructor({
    title,
    order = '0',
    description,
    userId,
    boardId,
    columnId
  } = {}) {
    this.id = uuidv5();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
    this.ver = process.env.npm_package_version;
    this.type = 'task';
  }

  toResponse() {
    return {
      id: this.id,
      title: this.title,
      order: this.order,
      description: this.description,
      userId: this.userId,
      boardId: this.boardId,
      columnId: this.columnId
    };
  }
}

const schemaTask = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required(),
  order: Joi.number().required(),
  description: Joi.string().required()
}).keys({
  userId: Joi.any(),
  columnId: Joi.any()
});

const schemaTaskNull = Joi.object({});

const schemaTaskId = Joi.object({
  taskId: Joi.string()
    .guid()
    .required()
});

module.exports = {
  Task,
  schemaTask,
  schemaTaskNull,
  schemaTaskId,
  schemaTaskId
};
