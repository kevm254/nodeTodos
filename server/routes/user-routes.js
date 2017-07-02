const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { authenticate } = require('./../middleware/authenticate');

let { User } = require('../db/models/user');


// POST /users
router.post('/', (req, res) => {
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


router.get('/me', authenticate, (req, res) => {
    res.send(req.user);
});

module.exports = { router };