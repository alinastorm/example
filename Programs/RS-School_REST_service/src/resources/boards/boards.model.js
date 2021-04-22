const uuidv5 = require('uuid');
const Joi = require('joi');

class Board {
  constructor({ title = 'title', columns = [] } = {}) {
    this.id = uuidv5();
    this.title = title;
    this.columns = columns.map(elem=>new Column(elem));
    this.ver = process.env.npm_package_version;
    this.type = 'board';
  }

  toResponse() {
    return {
      id: this.id,
      title: this.title,
      columns: this.columns
    };
  }
}

class Column {
  constructor({ title = 'title', order = 0 } = {}) {
    this.id =uuidv5();
    this.title = title;
    this.order = order;
  }
}


const _columns = Joi.array().items(
  Joi.object({
    title: Joi.string().required(),
    order: Joi.number()
      .integer()
      .greater(-1)
      .required()
  })
);
const _columnsWithId = Joi.array().items(
  Joi.object({
    id: Joi.string()
      .guid()
      .required(),
    title: Joi.string().required(),
    order: Joi.number()
      .integer()
      .greater(-1)
      .required()
  })
);

const schemaBoard = Joi.object({
  title: Joi.string().required(),
  columns: _columns.required()
});
const schemaBoardColumnsWithId = Joi.object({
  id: Joi.string()
  .guid().required(),
  title: Joi.string().required(),
  columns: _columnsWithId.required()
});;

// const schemaBoardWithId = Joi.object({
//   id: Joi.string()
//     .guid()
//     .required(),
//   title: Joi.string().required(),
//   columns: _columns.required()
// });

const schemaBoardNull = Joi.object({});

const schemaBoardId = Joi.object({
  boardId: Joi.string()
    .guid()
    .required()
});

// class Columns {
//   constructor({
//     id = uuid(),
//     title = 'title',
//     order = ''

//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.ver = process.env.npm_package_version;
//     this.type = 'board';
//   }

//   static toResponse() {

//     return  {
//       id: this.id,
//       title: this.title,
//       order: this.order,
//     };
//   }
// }

module.exports = {
  Board,
  schemaBoard,
  // schemaBoardWithId,
  schemaBoardNull,
  schemaBoardId,
  schemaBoardColumnsWithId
};
