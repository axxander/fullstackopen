const router = require('express').Router()

const { createUserHandler, getUserHandler, getUsersHandler } = require('../controllers/users.controller')


router.get('', getUsersHandler)

router.get('/:id', getUserHandler)

router.post('', createUserHandler)


module.exports = router