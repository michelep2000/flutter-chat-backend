const { io } = require('../index');

io.on('connection', client => {
    console.log('Client connected');
    client.on('disconnect', () => {
        console.log('Client disconnected');
    });
});