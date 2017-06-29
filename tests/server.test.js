const expect = require('expect');
const request = require('supertest');
const { app } = require('./../server/server');
const { Todo } = require('./../server/db/models/todo');
const { User } = require('./../server/db/models/user');

beforeEach((done) => {
    Todo.remove({}).then(() => { done(); });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
       let text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                }).catch((e) => done(e));
            });
        done();
    });

    it('should not create a todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos)=> {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => {
                    done(e);
                })
        });
            done();
    })

});
