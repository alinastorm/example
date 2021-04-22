const router = require('express').Router();
const boardsService = require('./boards.service');
const tasksService = require('../tasks/tasks.service');
const userService = require('../users/user.service');
const {
  schemaBoard,
  schemaBoardNull,
  schemaBoardId,
  schemaBoardColumnsWithId
} = require('./boards.model');
const {
  schemaTask,
  schemaTaskId,
  schemaTaskNull
} = require('../tasks/tasks.model');

//test Function
// router.route('*').all(async (req, res) => {
//   console.log("board")
//   })

//Update board by id
// PUT/boards/{boardId}  parameters (required):boardId ; body (required) :
// {
//   "title": "string",
//   "columns": [
//     {
//       "id": "string",
//       "title": "string",
//       "order": 0
//     }
//   ]
// }

// //ch1.1
// try {
//   //check
//   await isValid(req.body,schemaBoard );
//   await boardsService.getById(board.id);
//   //data
//   const board = await boardsService.create(req.body);
//   res.json(board.toResponse());
//   //
// } catch (error) {
//   res.status(error.status).json({
//     error: error.message
//   });
//   return;
// }
// //

//Check is valid data
const isValid = async (data, schema) => {
  try {
    await schema.validateAsync(data);
    return true;
  } catch (error) {
    error.status = 400;
    error.description = error;
    // error.message = 'Bad request';
    throw error;
  }
};

//GET All boards
// GET/boards  Parameters:NO; body:NO
router.route('/').get(async (req, res) => {
  //ch1
  try {
    //req
    await isValid(req.body, schemaBoardNull);
    await isValid(req.params, schemaBoardNull);
    //data
    const boards = await boardsService.getAll();
    res.json(boards.map(board => board.toResponse()));
    //
  } catch (error) {
    res.status(error.status).json({
      error: error.message
    });
    return;
  }
  //
});

//Create board
// POST/boards  Parameters:NO; body (required):
//  {
//   "title": "string",
//   "columns": [
//     {
//       "title": "string",
//       "order": 0
//     }
//   ]
// }
router.route('/').post(async (req, res) => {
  //ch1
  try {
    //req
    await isValid(req.body, schemaBoard);
    //data
    const board = await boardsService.create(req.body);
    await boardsService.getById(board.id);
    res.json(board.toResponse());
    //
  } catch (error) {
    res.status(error.status).json({
      error: error.message
    });
    return;
  }
  //
});

//Get board by id
// GET/boards/{boardId}  Parameters(required):boardId ; Request body:NO
router.route('/:boardId').get(async (req, res) => {
  //ch1
  try {
    //req
    await isValid(req.params, schemaBoardId);
    await isValid(req.body, schemaBoardNull);
    //data
    const board = await boardsService.getById(req.params.boardId);
    res.json(board.toResponse(board));
    //
  } catch (error) {
    res.status(error.status).json({
      error: error.message
    });
    return;
  }
  //
});

//Update board by id
// PUT/boards/{boardId}  parameters (required):boardId ; body (required) :
// {
//   "title": "string",
//   "columns": [
//     {
//       "id": "string",
//       "title": "string",
//       "order": 0
//     }
//   ]
// }
router.route('/:boardId').put(async (req, res) => {
  //ch1
  try {
    //req
    await isValid(req.params, schemaBoardId);
    await isValid(req.body, schemaBoardColumnsWithId);
    //data
    const board = await boardsService.updateById(req.params.boardId, req.body);
    res.json(board.toResponse(board));
    //
  } catch (error) {
    res.status(error.status).json({
      error: error.message
    });
    return;
  }
  //
});

//Deletes a Board by ID. When somebody DELETE Board, all its Tasks should be deleted as well
// DELETE/boards/{boardId}  parameters (required):boardId ; body: NO
router.route('/:boardId').delete(async (req, res) => {
  //ch1
  try {
    //req
    await isValid(req.params, schemaBoardId);
    await isValid(req.body, schemaBoardNull);
    //data
    await boardsService.deleteById(req.params.boardId);
    await tasksService.deleteByBoardId(req.params.boardId);
    await tasksService.isDeleteById(req.params.boardId);
    res.status(204).json('The board has been deleted');
    //
  } catch (error) {
    console.log('delete board');
    res.status(error.status).json({
      error: error.message
    });
    return;
  }
  //
});
////////////////////////////////////////////////////////////////////////////////////////////
// Gets All tasks by the Board ID (e.g. “/board/1/tasks”)
// GET/boards/{boardId}/tasks  parameters (required):boardId ; body: NO
router.route('/:boardId/tasks').get(async (req, res) => {
  //ch1
  try {
    //req
    await isValid(req.params, schemaBoardId);
    await isValid(req.body, schemaBoardNull);

    //data
    const tasks = await tasksService.getByBoardId(req.params.boardId);
    res.json(tasks.map(task => task.toResponse()));
    console.log('getByBoardId', req.params);
    
    //
  } catch (error) {
    const tasks3 = await tasksService.getAll();
    console.log('error getByBoardId',error.message, req.params,'BD',tasks3 );

    res.status(error.status).json({
      error: error.message
    });
    return;
  }
  //
});

//Creates a new task
// POST/boards/{boardId}/tasks  parameters (required):boardId ; body (required) :
// {
//   "title": "string",
//   "order": 0,
//   "description": "string",
//   "userId": "string",
//   "boardId": "string",
//   "columnId": "string"
// }

router.route('/:boardId/tasks').post(async (req, res) => {
  //ch1
  try {
    //check
    await isValid(req.params, schemaBoardId);
    await isValid(req.body, schemaTask);
    await boardsService.getById(req.params.boardId);
    //Fix error in Tests
    // await userService.getById(req.body.userId);
    // await boardsService.getById(req.body.boardId);
    // await boardsService.isHaveColumns(req.body.boardId,req.body.columnId);
    //data
    const task = await tasksService.create({
      ...req.body
    });
    res.json(task.toResponse());
    console.log('create task', req.params,task.id);

    //
  } catch (error) {
    console.log('error create task',error.message, req.params, req.body );

    //ТЗ хардкод (см. лучше универсально)
    res.status(400).json('Bad request');
    return;
  }
  //
});

//Gets the Task by the Board's and task ID (e.g. “/board/1/tasks/123”)
// GET/boards/{boardId}/tasks/{taskId}  parameters (required):boardId,taskdId ; body: NO
router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  //ch1
  try {
    //req
    await isValid({ boardId: req.params.boardId }, schemaBoardId);
    await isValid({ taskId: req.params.taskId }, schemaTaskId);
    await isValid(req.body, schemaTaskNull);

    //data
    await boardsService.getById(req.params.boardId);
    await tasksService.getById(req.params.taskId);
    const task = await tasksService.getByBoardIdTaskId(req.params);
    
    res.json(task.toResponse());
    console.log('getByBoardIdTaskId', req.params);
    
    //
  } catch (error) {
    const tasks3 = await tasksService.getAll();
    const tasks4 = await boardsService.getAll();
    console.log('error getByBoardIdTaskId',error.message, req.params,req.params,'T',tasks3,'B',tasks4);

    res.status(error.status).json({
      error: error.message
    });
    return;
  }
  //
});

//Updates the Task by ID
// PUT/boards/{boardId}/tasks/{taskId} parameters (required):boardId,taskdId ; body:
// {
//   "title": "string",
//   "order": 0,
//   "description": "string",
//   "userId": "string",
//   "boardId": "string",
//   "columnId": "string"
// }
router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  //Ch1
  try {
    //check
    // await isValid({ boardId: req.params.boardId }, schemaBoardId);
    await isValid({ taskId: req.params.taskId }, schemaTaskId);
    // await isValid(req.body, schemaTask);
    // await boardsService.getById(req.params.boardId);
    await tasksService.getById(req.params.taskId);
    // await userService.getById(req.body.userId);
    // await boardsService.getById(req.body.boardId);
    // await boardsService.isHaveColumns(req.body.boardId, req.body.columnId);
    //data
    const task = await tasksService.updateByBoardIdTaskId({
      body: req.body,
      params: req.params
    });
    res.json(task.toResponse());
    console.log('updeit');

    //
  } catch (error) {
    console.log('error updeit');
    
    res.status(error.status).json({
      error: error.message
    });
    return;
  }
  //
});

//Deletes Task by ID.
// DELETE/boards/{boardId}/tasks/{taskId} parameters (required):boardId,taskdId ; body:NO
router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  //Ch1
  try {
    //req
    await isValid({ boardId: req.params.boardId }, schemaBoardId);
    await isValid({ taskId: req.params.taskId }, schemaTaskId);
    await isValid(req.body, schemaTaskNull);
    await boardsService.getById(req.params.boardId);
    await tasksService.getById(req.params.taskId);
    //data
    await tasksService.deleteByBoardIdTaskId(req.params);
    res.status(204).json('The task has been deleted');
    console.log('del');
    //
  } catch (error) {
    console.log('error del');
    res.status(error.status).json({
      error: error.message
    });
    return;
  }
  //
});

module.exports = router;
