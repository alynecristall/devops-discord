const http = require('http');
const express = require('express');
const assert = require('assert');

const app = express();
app.use(express.json());

let tasks = [
    { id: 1, title: 'Estudar DevOps', completed: false },
    { id: 2, title: 'Criar projeto de exemplo', completed: true }
];

// Funções do seu app
function findTaskById(taskId) {
    return tasks.find(task => task.id === taskId);
}

app.get('/tasks/:id', (req, res) => {
    const task = findTaskById(parseInt(req.params.id));

    if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    res.json(task);
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = { id: tasks.length + 1, title: req.body.title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// Testes simples
const testGetAllTasks = () => {
    const res = { json: (data) => {
        assert.strictEqual(data.length, 2, 'Deve retornar duas tarefas');
    }};
    app._router.handle({ method: 'GET', url: '/tasks' }, res);
};

const testGetTaskById = () => {
    const req = { params: { id: '1' } };
    const res = {
        json: (data) => {
            assert.strictEqual(data.title, 'Estudar DevOps', 'Deve retornar a tarefa correta');
        },
        status: (code) => {
            assert.strictEqual(code, 200, 'Deve retornar status 200');
            return res;
        }
    };
    app._router.handle(req, res);
};

const testGetTaskNotFound = () => {
    const req = { params: { id: '999' } };
    const res = {
        json: (data) => {
            assert.strictEqual(data.error, 'Tarefa não encontrada.', 'Deve retornar erro de não encontrado');
        },
        status: (code) => {
            assert.strictEqual(code, 404, 'Deve retornar status 404');
            return res;
        }
    };
    app._router.handle(req, res);
};

// Executando os testes
testGetAllTasks();
testGetTaskById();
testGetTaskNotFound();

console.log('Todos os testes passaram!');

