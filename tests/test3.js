const request = require('supertest');
const express = require('express');

const app = express();
let tasks = [{ id: 1, title: 'Tarefa para deletar' }];
app.use(express.json());
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

describe('DELETE /tasks/:id', () => {
    it('should delete a task', async () => {
        const response = await request(app).delete('/tasks/1');
        expect(response.status).toBe(204);
        const taskResponse = await request(app).get('/tasks/1');
        expect(taskResponse.status).toBe(404);
    });
});
