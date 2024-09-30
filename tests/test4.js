const request = require('supertest');
const express = require('express');

const app = express();
let tasks = [{ id: 1, title: 'Tarefa original', completed: false }];
app.use(express.json());
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    tasks[taskIndex].title = req.body.title || tasks[taskIndex].title;
    res.json(tasks[taskIndex]);
});

describe('PUT /tasks/:id', () => {
    it('should update a task', async () => {
        const response = await request(app).put('/tasks/1').send({ title: 'Tarefa atualizada' });
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Tarefa atualizada');
    });
});
