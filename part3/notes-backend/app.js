const connect = require('./db/connect.db')
const logger = require('./utils/logger.utils')
const server = require('./utils/server.utils')


const app = server()
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    logger.info(`Server live at http://localhost:${PORT}`)

    // connect to db
    connect()
})