const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/db/models/todo');
const { User } = require('./../server/db/models/user');


let id = '59555c5639038514bb998915';

if(!ObjectID.isValid(id)) {

}

Todo.find({
    _id: id
}).then((todos) => {
    console.log(todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('TODO', todo);
});

Todo.findById(id)
    .then((todo) => {
        if(!todo) {
            return console.log('ID not found');
        }
    console.log('FINDBYID', todo);
}).catch((e) => {
    console.log(e);
});

User.findById('5955343b74801f19a8237ff8')
    .then((user) => {
        if (!user) {
           return console.log('Unable to find user');
        }
        console.log('USER: ', user);
    })
    .catch((err) => {
        console.log(err);
    });

mongoose.disconnect();