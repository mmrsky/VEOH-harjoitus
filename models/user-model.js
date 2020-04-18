// Authorisation model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'todo',
        req: true
    }]
});
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;