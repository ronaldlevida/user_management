const express = require('express');
const router = express.Router();
let user = require('../user/userData');
const userController = require('../controllers/userController');

// Route for user list
router.get('/', userController.list);

// // Route for user add
 router.post('/add', userController.addUser);

// // Route for user update
 router.put('/update/:id', userController.updateUser);

// // Route for user delete
 router.delete('/delete/:id',  userController.deleteUser);



module.exports = router;