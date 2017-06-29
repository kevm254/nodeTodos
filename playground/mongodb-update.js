const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log("Could not connect to the database: " + err);
    }

    console.log('connected to database');

    db.collection('Todos')
        .findOneAndUpdate({ _id: new ObjectID('59549f514b0f4434f62ea45d')}, { $set: { completed: true }}, { returnOriginal: false })
        .then((result) => {
            console.log(result);
        });

    db.close();

});
