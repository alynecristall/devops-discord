const request = require('supertest');
const express = require('express');

const app = express();
let tasks = [
    { id: 1, title: 'Tarefa 1', completed: false },
    { id: 2, title: 'Tarefa 2', completed: true }
];

app.use(express.json());
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

describe('GET /tasks', () => {
    it('should return all tasks', async () => {
        const response = await request(app).get('/tasks');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
});
