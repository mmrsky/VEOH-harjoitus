// Model for todo list item

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoitem_schema = new Schema({
    text: {
        type: String,
        required: true
    }
});
const todoitem_model = new mongoose.model('note', todoitem_schema);

module.exports = todoitem_model;