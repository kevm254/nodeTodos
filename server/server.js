require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todo-routes').router;
const userRoutes = require('./routes/user-routes').router;

const { ObjectID } = require('mongodb');

require('./db/mongoose');


let port = process.env.PORT;

app.use(bodyParser.json());

app.use('/todos', todoRoutes);

app.use('/users', userRoutes);
app.get('/', (req, res) => {
   res.send('hi there');
});




app.listen(port, () => {
    console.log('Listening on port: ', port);
});

module.exports = { app };