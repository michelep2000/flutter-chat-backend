const { checkJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userConnected, userDisconnected, saveMessage } = require('../controllers/socket');

io.on('connection', client => {
    console.log('Client connected');

    //get token and check it
    const token = client.handshake.headers['x-token'];
    const [isValid, uid] = checkJWT(token)

    //verify auth
    if (!isValid) { return client.disconnect(); }

    //user authenticated
    userConnected(uid);

    //set a room for the user
    client.join(uid);

    //listen to private messages
    client.on('private-message', async(payload) => {
        console.log(payload);
        await saveMessage(payload);
        io.to(payload.to).emit('private-message', payload);
    });


    client.on('disconnect', () => {
        userDisconnected(uid);
    });
});