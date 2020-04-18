// Model for Todo-list

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todolistSchema = new Schema({
    text: {
        type: String,
        required: true
    }
});

const todolistModel = new mongoose.model('todo', todolistSchema);
module.exports = todolistModel;