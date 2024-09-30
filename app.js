const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware para parsear o corpo das requisições JSON

let tasks = [
    { id: 1, title: 'Estudar DevOps', completed: false },
    { id: 2, title: 'Criar projeto de exemplo', completed: true }
];

// Função para encontrar uma tarefa pelo ID
function findTaskById(taskId) {
    return tasks.find(task => task.id === taskId);
}

// Rota para obter todas as tarefas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Rota para obter uma tarefa específica pelo ID
app.get('/tasks/:id', (req, res) => {
    const task = findTaskById(parseInt(req.params.id));

    if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    res.json(task);
});

// Rota para criar uma nova tarefa
app.post('/tasks', (req, res) => {
    const newTask = { id: tasks.length + 1, title: req.body.title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Rota para atualizar uma tarefa existente
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    tasks[taskIndex].title = req.body.title || tasks[taskIndex].title;
    tasks[taskIndex].completed = req.body.completed !== undefined ? req.body.completed : tasks[taskIndex].completed;

    res.json(tasks[taskIndex]);
});

// Rota para excluir uma tarefa pelo ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'ID inválido fornecido.' });
    }

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`App rodando em http://localhost:${port}`);
});

// Exporta o aplicativo para testes
module.exports = app;
