// const { Note, User } = require('../models/index')


const nonExistingDocumentId = async (model, payload) => {
    const doc = new model(payload)
    const savedDoc = await doc.save()
    await doc.remove()

    return savedDoc._id.toString()
}


module.exports = {
    nonExistingDocumentId,
}