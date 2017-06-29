const { MongoClient, ObjectID } = require('mongodb');

let obj = new ObjectID();
console.log(obj);

var user = { name: 'andrew', age: 25 };
var { name } = user;


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log(`Unable to connect to MongoDB due to an error: ${err}`);
    }
    console.log('Connected to a MongoDB server');

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo' + err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.collection('Users').insertOne({
        name: 'Kane',
        age: 20,
        location: 'Korath'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert: ' + err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());
    });


    db.close();
});