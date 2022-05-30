const express = require('express');
const app = express();
const router = require('./api/router');

app.use(router)

const PORT = process.env.port || 8080;

app.listen(PORT, () => {
    console.log('App listening on port: ' + PORT)
});