const generateId = (notes) => {
    return notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1
}

module.exports = generateId