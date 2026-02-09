const dotenv = require('dotenv');
dotenv.config();

const { initDB } = require('./config/db.js');
const app = require("./app.js");

const PORT = 3000;

async function startServer() {
    try {
        await initDB();
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);    
        });
    } catch (err) {
        console.error('Database setup failed:', err.message);
        process.exit(1);
    }
}

startServer();