const express = require('express');
const router = express.Router();

router.get('/hi', ()=> {
   res.status(200).send('hi');
});

exports.module = { router };