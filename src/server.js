// src/server.js

const app = require("./app.js");
/**
 * Port for the HTTP server.
 */
const PORT = 3000;

/**
 * Start the HTTP server.
 */
app.listen(3000, ()=>{
    console.log("Listening on port 3000");    
})