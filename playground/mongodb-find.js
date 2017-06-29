const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to the MongoDB server');
    }

    db.collection('Todos')
        .find({ completed: true })
        .toArray()
        .then((docs)=> {
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to fetch todos', err);
        });

    db.collection('Todos')
        .find()
        .count()
        .then((count) => {
            console.log(`Count: ${count}`);
            }, (err) => {
                console.log('Unable to fetch todos');
            });

    db.collection('Users')
        .find({ name: 'Kane' })
        .toArray()
        .then((items) => {
            console.log(JSON.stringify(items, undefined, 2))
        });


    db.close();
});