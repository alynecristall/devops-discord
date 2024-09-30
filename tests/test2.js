const request = require('supertest');
const express = require('express');

const app = express();
let tasks = [];
app.use(express.json());
app.post('/tasks', (req, res) => {
    const newTask = { id: tasks.length + 1, title: req.body.title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

describe('POST /tasks', () => {
    it('should create a new task', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ title: 'Nova tarefa' });
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Nova tarefa');
    });
});
