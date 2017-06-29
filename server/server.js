const express = require('express');
const bodyParser = require('body-parser');

let { mongoose } = require('./db/mongoose');
// Models
let { Todo } = require('./db/models/todo');
let { User } = require('./db/models/user');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send('whoaaa welcome');
});

app.post('/todos', (req, res)=> {
    let todo = new Todo({
       text: req.body.text
    });

    todo.save().then(
        (doc) => {
            res.status(200).send(doc);
        },
        (err) => {
            res.status(400).send(err);
        }
    );
});



app.listen(3000, () => {
    console.log('Listening on port: ', 3000);
});