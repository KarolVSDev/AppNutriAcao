const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3006;

// Middleware para análise de corpo JSON
app.use(express.json());

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'batbook',
  password: '123',
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
    const query = 'SELECT * FROM users WHERE email = ? AND senha = ?';
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
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Erro ao executar consulta SQL:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json(results);
  });
});


// Rota para cadastro de usuários
app.post('/cadastro', (req, res) => {
  const { nome, email, cnpj, telefone, cep, rua, numero, senha } = req.body;
  const sql = 'INSERT INTO users (nome, email, cnpj, telefone, cep, rua, numero, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [nome, email, cnpj,telefone, cep, rua, numero, senha], (err, result) => {
      if (err) {
          console.error('Erro ao cadastrar usuário:', err);
          res.status(500).json({ message: 'Erro ao cadastrar usuário' });
      } else {
          console.log('Usuário cadastrado com sucesso');
          res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
      }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://192.168.100.8:${port}`);
});
