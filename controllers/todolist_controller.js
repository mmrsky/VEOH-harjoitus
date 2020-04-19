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

// Add new todo item
const postTodo = (req, res, next) => {
    const user = req.user;
    let newTodo = todoModel({
        text: req.body.todoitem
    });
    newTodo.save().then(() => {
        user.todos.push(newTodo);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};

// Change completed state
const postToggleChecked = (req, res, next) => {
    const todoId = req.body.todo_id;
    todoModel.findOne({
        _id: todoId
    }).then((todo) => {
        todo.complete =! todo.complete;
        todo.save().then(() => {
            return res.redirect('/');
        });
    });
};


module.exports.getTodos = getTodos;
module.exports.postTodo = postTodo;
module.exports.postDeleteTodo = postDeleteTodo;
module.exports.postToggleChecked = postToggleChecked;