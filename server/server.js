const express = require('express');
const bodyParser = require('body-parser');
const { router } = require('./routes/main-routes');
const { ObjectID } = require('mongodb');

let { mongoose } = require('./db/mongoose');
// Models
let { Todo } = require('./db/models/todo');
let { User } = require('./db/models/user');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.get('/todos', (req, res) => {
   Todo.find().then((todos) => {
        res.send({ todos });
   }, (err) => {
        res.status(400).send(err);
   })
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

app.get('/todos/:id', (req, res) => {
    let id = req.params['id'];

    if (!ObjectID.isValid(id)) {
        return res.status(404).send("We didn't find what you were looking for.")
    }



   User.findById(req.params['id'])
       .then((user) => {
           if (!user) {
               return res.send('No user was found');
           }
           console.log(user);
           res.status(200).send({ user, status: 200 });
       },
       (err) => {
           res.status(404).send('No user was found');
       })
});



app.listen(port, () => {
    console.log('Listening on port: ', port);
});


module.exports = { app };