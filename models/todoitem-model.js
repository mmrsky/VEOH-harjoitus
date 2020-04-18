// Model for todo list item

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoitem_schema = new Schema({
    text: {
        type: String,
        required: true
    }
});
const todoitemModel = new mongoose.model('todo', todoitem_schema);

module.exports = todoitemModel;