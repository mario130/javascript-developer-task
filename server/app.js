const express = require('express');
const bodyParser = require('body-parser');

const app = express()

// Middleware
app.use(bodyParser.json());

// Routes


// Start the server
const PORT =  4001
app.listen(PORT, ()=>console.log(`Now listening on port ${PORT}`))