const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const validate = require('../middleware/validate')
const { createUserSchema, updateUserSchema } = require('../validators/userValidator')


router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.patch('/:id', userController.updateUser);
router.patch('/archive/:id', userController.archiveUser);
router.patch('/unarchive/:id', userController.unarchiveUser);
router.delete('/hard/:id', userController.hardDeleteUser);

module.exports = router