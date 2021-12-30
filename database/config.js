const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true
        });

        console.log('DB Online')

    } catch (e) {
        console.log(e);
        throw new Error('database error')
    }
}

module.exports = {
    dbConnection
}