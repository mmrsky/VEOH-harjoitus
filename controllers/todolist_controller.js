const todoModel = require('../models/todoitem-model');

// Get list of todo items
const getTodos = (req, res, next) => {
    const user = req.user;
    user.populate('todos')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
                todos: user.todos
            };
            res.render('todolist', {data: data});
        });
};

// Delete todo item
const postDeleteTodo = (req, res, next) => {
    const user = req.user;
    const todoIdToDelete = req.body.todo_id;

    //Remove todo from user.todos
    const updatedTodos = user.todos.filter((todoId) => {
        return todoId != todoIdToDelete;
    });
    user.todos = updatedTodos;

    //Remove todo object from database
    user.save().then(() => {
        todoModel.findByIdAndRemove(todoIdToDelete).then(() => {
            res.redirect('/');
        });
    });
};

// Get todo item
const getTodo = (req, res, next) => {
    const todoId = req.params.id;
    todoModel.findOne({
        _id: todoId
    }).then((todo) => {
        let data = {
            text: todo.text
        };
        res.render('todolist');
    });
};

// Add new todo item
const postTodo = (req, res, next) => {
    const user = req.user;
    let newTodo = todoModel({
        text: req.body.todoitem
    });
    newTodo.save().then(() => {
        console.log('todo saved');
        user.todos.push(newTodo);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};


module.exports.getTodos = getTodos;
module.exports.getTodo = getTodo;
module.exports.postTodo = postTodo;
module.exports.postDeleteTodo = postDeleteTodo;