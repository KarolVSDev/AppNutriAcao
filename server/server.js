const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;

// Middleware para análise de corpo JSON
app.use(express.json());

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
  host: '192.168.100.8',
  user: 'root',
  password: '',
  database: 'nutriacao'
});

// Rota para login de usuário
app.post('/usuarios', (req, res) => {
    const { email, senha } = req.body;
    console.log('Email recebido:', email);
    console.log('Senha recebida:', senha);

    // Verifica se o email e a senha foram fornecidos
    if (!email || !senha) {
        res.status(400).json({ error: 'Email e senha são obrigatórios' });
        return;
    }

    // Consulta SQL para verificar se o usuário existe com o email e senha fornecidos
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    console.log('Consulta SQL:', query, [email, senha]);
    connection.query(query, [email, senha], (error, results) => {
        if (error) {
            console.error('Erro ao verificar login:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        console.log('Resultado da consulta SQL:', results);
           // Se nenhum usuário foi encontrado, ou se as credenciais estão incorretas
           if (results.length === 0) {
            console.log('Credenciais inválidas');
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }

        // Se o usuário foi encontrado, retorna um status 200 OK
        console.log('Login bem-sucedido');
        res.status(200).end();
    });
});

// Conectar ao banco de dados MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

// Rota para recuperar dados do banco de dados (opcional)
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (error, results) => {
    if (error) {
      console.error('Erro ao executar consulta SQL:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json(results);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://192.168.100.8:${port}`);
});
