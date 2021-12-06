const router = require('express').Router()

const { createTokenHandler } = require('../controllers/sessions.controller')


router.post('', createTokenHandler)


module.exports = router
