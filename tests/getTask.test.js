const request = require('supertest');
const express = require('express');

const app = express();
let tasks = [
    { id: 1, title: 'Estudar DevOps', completed: false },
    { id: 2, title: 'Criar projeto de exemplo', completed: true }
];

app.use(express.json());
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    res.json(task);
});

describe('GET /tasks/:id', () => {
    it('should return a task by ID', async () => {
        const response = await request(app).get('/tasks/1');
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Estudar DevOps');
    });

    it('should return 404 for a non-existing task', async () => {
        const response = await request(app).get('/tasks/99');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Tarefa não encontrada.');
    });
});
