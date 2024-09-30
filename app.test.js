const http = require('http');
const app = require('./app'); // Importando o app para testes

const testGetTasks = () => {
    http.get('http://localhost:3000/tasks', (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const tasks = JSON.parse(data);
            console.log('Teste GET /tasks:', tasks.length === 2 ? 'Passou' : 'Falhou');
        });
    }).on('error', (err) => {
        console.error('Erro na requisição:', err.message);
    });
};

const testGetTaskById = () => {
    http.get('http://localhost:3000/tasks/1', (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const task = JSON.parse(data);
            console.log('Teste GET /tasks/1:', task.title === 'Estudar DevOps' ? 'Passou' : 'Falhou');
        });
    }).on('error', (err) => {
        console.error('Erro na requisição:', err.message);
    });
};

// Iniciando os testes
const startTests = () => {
    // Iniciar o servidor para os testes
    const server = app.listen(3000, () => {
        console.log('Servidor de testes rodando na porta 3000');
        testGetTasks();
        testGetTaskById();
    });

    // Fechar o servidor após os testes
    setTimeout(() => {
        server.close();
        console.log('Servidor de testes encerrado');
    }, 5000); // Ajuste o tempo conforme necessário
};

// Executar os testes
startTests();
