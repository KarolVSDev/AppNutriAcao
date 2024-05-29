const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3006;

// Middleware para análise de corpo JSON
app.use(express.json());

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
  host: '192.168.100.8',
  user: 'root',
  password: '',
  database: 'appnutri'
});

// Verificar a conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL');
});
// Rota para buscar todos os pontos de coleta
app.get('/pontos_coleta', (req, res) => {
  const query = 'SELECT * FROM pontos_coleta';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao buscar os pontos de coleta:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao buscar os pontos de coleta' });
      return;
    }

    res.status(200).json(results);
  });
});


// Rota para salvar um ponto de coleta
app.post('/pontos_coleta', (req, res) => {
  const newPonto = {
      nome: req.body.nome,
      endereco: req.body.endereco,
      zona: req.body.zona
  };

  const query = 'INSERT INTO pontos_coleta (nome, endereco, zona) VALUES (?, ?, ?)';
  connection.query(query, [newPonto.nome, newPonto.endereco, newPonto.zona], (error, results) => {
    if (error) {
      console.error('Erro ao inserir o ponto de coleta:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao salvar o ponto de coleta' });
      return;
    }

    const insertedId = results.insertId;
    res.status(201).json({ data: { id: insertedId, ...newPonto } });
  });
});

// Rota para login de usuário
app.post('/usuarios', (req, res) => {
  const { email, senha } = req.body;
  console.log('Email recebido:', email);
  console.log('Senha recebida:', senha);

  if (!email || !senha) {
    res.status(400).json({ error: 'Email e senha são obrigatórios' });
    return;
  }

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta SQL:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao executar a consulta SQL' });
      return;
    }

    console.log('Resultado da consulta SQL:', results);

    if (results.length === 0) {
      console.log('Credenciais inválidas: Usuário não encontrado');
      res.status(401).json({ error: 'Credenciais inválidas: Usuário não encontrado' });
      return;
    }

    const user = results[0];
    console.log('Usuário encontrado:', user);

    if (senha !== user.senha) {
      console.log('Credenciais inválidas: Senha incorreta');
      res.status(401).json({ error: 'Credenciais inválidas: Senha incorreta' });
      return;
    }

    // Retornar os dados dos usuários
    const allUsersQuery = 'SELECT * FROM usuarios';
    connection.query(allUsersQuery, (error, allUsers) => {
      if (error) {
        console.error('Erro ao buscar todos os usuários:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar todos os usuários' });
        return;
      }

      console.log('Todos os usuários:', allUsers);
      res.status(200).json({ message: 'Login bem-sucedido', data: allUsers });
    });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://192.168.100.8:${port}`);
});
