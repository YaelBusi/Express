const express = require('express');
const router = express.Router();
const user = require('../controllers/User')

router.get('/', user.getUsers)

router.get('/:id', user.getUserById)

router.get('/:email/:password', user.getUserByEmailAndPassword)

router.post('/', user.addUser)

router.delete('/:id', user.deleteUserById)

router.put('/:id', user.updateUserById)

module.exports = router;