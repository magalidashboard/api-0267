require('dotenv').config();
var url = require('url');

//process.env.PORT

const http = require('http');
const port = process.env.PORT || 5000;

const app = require('./src/main');
const server = http.createServer(app);

server.listen(port, () => console.info(` API #00267: ${process.env._URL}:${port} - database: ${process.env.DATABASE_URL} `));

