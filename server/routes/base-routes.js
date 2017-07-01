const express = require('express');
const router = express.Router();

router.get('/hi', (req, res, next)=> {
   res.status(200).send('hi');
});

module.exports = { router };