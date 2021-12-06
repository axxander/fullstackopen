const router = require('express').Router()

const {
    createNoteHandler,
    deleteNoteHandler,
    getNoteHandler,
    getNotesHandler,
    updateNoteHandler,
} = require('../controllers/notes.controller')
const { requiresUser } = require('../middleware/sessions.middleware')


router.get('', getNotesHandler)

router.post('', [requiresUser], createNoteHandler)

router.get('/:id', getNoteHandler)

router.put('/:id', updateNoteHandler)

router.delete('/:id', deleteNoteHandler)


module.exports = router