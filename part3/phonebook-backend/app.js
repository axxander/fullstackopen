const server = require('./utils/server.utils');

const app = server();


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
});