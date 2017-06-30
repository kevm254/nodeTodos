const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/db/models/todo');
const { User } = require('./../server/db/models/user');

Todo.remove({}).then((result) => {
    console.log(result);
});

// Todo.findOneAndRemove()
Todo.findByIdAndRemove('59559475ae481c166a7c5195').then((todo) => {
    console.log(todo);
});