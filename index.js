require('dotenv').config();
//process.env.PORT

const http = require('http');
const port = process.env.PORT || 5000;

const app = require('./src/main');
const server = http.createServer(app);

server.listen(port, () => console.log(` API CARREGOU: http://localhost:${port} - database: ${process.env.DATABASE_URL} `));

