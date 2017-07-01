require('./config/config');
const express = require('express');
const app = express();
const _ = require('lodash');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

require('./db/mongoose');

let { Todo } = require('./db/models/todo');
let { User } = require('./db/models/user');

let port = process.env.PORT;

app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send('hi there');
});

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

app.delete('/todos/:id', (req, res) => {
    let id = ObjectID.isValid(req.params.id);
    if (!id) {
        return res.status(404).send('Invalid user ID entered');
    }

    User.findByIdAndRemove(id)
        .then((user) => {
            if (!user) {
                return res.send('No user was found');
            }
            res.status(200).send('User was removed');
        })
        .catch((err) => {
            res.status(404).send('Could not find user');
        })

});


app.patch('/todos/:id', (req, res) => {
   let id = req.params.id;
   let body = _.pick(req.body, ['text', 'completed']);

   if (!ObjectID.isValid(id)) {
       return res.status(404).send();
   }

   if(_.isBoolean(body.completed) && body.completed) {
       body.completedAt = new Date().getTime();
   } else {
        body.completed = false;
        body.completedAt = null;
   }

   Todo.findByIdAndUpdate(id, { $set: body }).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
            res.send({todo});
   }).catch((e) => {
       res.status(404).send();
   })
});


// POST / users
app.post('/users', (req, res) => {
   let body = _.pick(req.body, ['email', 'password']);
   let user = new User(body);


   user.save()
       .then((user) => {
           return user.generateAuthToken();
       })
       .then((token) => {
            res.header('x-auth', token).send(user);
       })
       .catch((e) => {
           res.status(400).send(e);
       })
});


app.listen(port, () => {
    console.log('Listening on port: ', port);
});

module.exports = { app };