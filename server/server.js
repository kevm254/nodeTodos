require('./config/config');
require('./db/mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todo-routes').router;
const userRoutes = require('./routes/user-routes').router;

const { ObjectID } = require('mongodb');



let port = process.env.PORT;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/todos', todoRoutes);
app.use('/users', userRoutes);
app.get('/', (req, res) => {
   res.send('hi there');
});




app.listen(port, () => {
    console.log('Listening on port: ', port);
});

module.exports = { app };