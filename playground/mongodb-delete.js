const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) { return console.log('There was an error connecting to the database: ' + err) }
    //
    // db.collection('Todos').deleteMany({ text: 'Eat Lunch' }).then((result) => {
    //     console.log(result.result);
    // });

    // db.collection('Todos').deleteOne({ text: 'Eat Lunch' }).then((result) => {
    //     console.log(result.result);
    // })

    // db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
    //
    // });

    db.collection("Todos")
        .findOneAndDelete({ _id: new ObjectID('595480b5769cc72d7a48618b') })
        .then((result) => {
            console.log(result);
        });

    db.close();
});