const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 10
};


let token = jwt.sign(data, 'supersecret');
let decodedResults = jwt.verify(token, 'supersecret');
console.log(token);
console.log(decodedResults);