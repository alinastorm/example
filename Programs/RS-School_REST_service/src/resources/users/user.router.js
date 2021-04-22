const router = require('express').Router();
const { schemaUserNull,schemaUserId,schemaUser } = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/tasks.service');

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

// //ch1
// try {
//   //req
//   await isValid(req.body,schemaBoard );
//   //data
//   const board = await boardsService.create(req.body);
//   await boardsService.getById(board.id);
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
async function isValid(data, schema) {
  try {
    const val = await schema.validateAsync(data);
    return true;
  } catch (error) {
    error.status = 400;
    error.description = error;
    // error.message = 'Bad request';
    throw error;
  }
}


//Gets all users (remove password from response)
// GET/users  parameters :NO ; body:NO
router.route('/').get(async (req, res) => {
  //ch1
  try {
    //req
    await isValid(req.body, schemaUserNull);
    
    //data
    const users = await usersService.getAll();
    res.json(users.map(user => user.toResponse()));
    //
  } catch (error) {
    res.status(error.status).json({
      error: error.message
    });
    return;
  }
  //
});

//Creates a new user (remove password from response)
// POST/users  parameters:NO ; body (required) :
// {
//   "name": "string1",
//   "login": "string1",
//   "password": "string1"
// }


router.route('/').post(async (req, res) => {
  //ch1
  try {
    //req
    await isValid(req.body, schemaUser);
    //data
    const user = await usersService.create(req.body);
    await usersService.getById(user.id);
    res.json(user.toResponse());
    
    //
  } catch (error) {
    res.status(400).json({});
    return;
  }
  //
});

//Gets a user by ID e.g. “/users/123” (remove password from response)
// GET/users/{usersId}  parameters  (required) :userId ; body :NO
router.route('/:userId').get(async (req, res) => {
  //ch1
  try {
    //req
    await isValid(req.params, schemaUserId);
    //data
    const user = await usersService.getById(req.params.userId);
    // map user fields to exclude secret fields like "password"
    res.json(user.toResponse());
    //
  } catch (error) {
    res.status(404).json({
      error: error.message
    });
    return;
  }
  //
});

//Updates a user by ID
// PUT/users/{usersId}  parameters (required) :userId  ; body (required) :
// {
//   "name": "string2",
//   "login": "string2",
//   "password": "string2"
// }
router.route('/:userId').put(async (req, res) => {
  //ch1
  try {
    //req
    await isValid(req.params, schemaUserId);
    await isValid(req.body, schemaUser);
    //data
    const user = await usersService.updateById(req.params.userId, req.body);
    // map user fields to exclude secret fields like "password"
    res.json(user.toResponse());
    //
  } catch (error) {
    res.status(400).json({
    });
    return;
  }
  //
});

//Deletes user by ID. When somebody DELETE User, all Tasks where User is assignee should be updated to put userId=null
// DELETE/users/{usersId}  parameters (required) :userId  ; body :NO
router.route('/:userId').delete(async (req, res) => {
  //ch1
  try {
    //req
    await isValid(req.params, schemaUserId);
    //data
    await usersService.deleteById(req.params.userId);
    await tasksService.updateUserToNull(req.params.userId);
    tasks =await tasksService.getAll()
    console.log("tasks", await tasks)
    res.status(204).json('The user has been deleted');
    //
  } catch (error) {
    res.status(404).json({
    });
    return;
  }
  //
});

module.exports = router;
