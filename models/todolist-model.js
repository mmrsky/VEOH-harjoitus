// Model for Todo-list

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todolist_schema = new Schema({
    text: {
        type: String,
        required: true
    }
});

const todolist_model = new mongoose.model('note', todolist_schema);
module.exports = todolist_model;