const { Schema, model } = require('mongoose');

const MessageSchema = Schema({
    by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    message: {
        type: String,
        require: true
    },

}, { timestamps: true });

MessageSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
})

module.exports = model('Message', MessageSchema);