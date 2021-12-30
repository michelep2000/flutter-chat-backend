const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();


//DB config
const { dbConnection } = require('./database/config');
dbConnection();

//read and body parser
app.use(express.json());

//node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


//public path
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//my routes
app.use('/api/login', require('./routes/auth'))

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);
    console.log('Server running in port:', process.env.PORT);

});