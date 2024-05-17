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

      console.log('Login bem-sucedido');
      res.status(200).json({ message: 'Login bem-sucedido' }); // Adicionado para enviar uma resposta JSON com uma mensagem de sucesso
  });
});

// Rota para cadastro de usuários
// Rota para cadastro de usuários
app.post('/cadastro', (req, res) => {
  const { nome, email, cnpj, telefone, cep, rua, numero, senha } = req.body;
  
  // Verificar se o email já está em uso
  connection.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
      if (err) {
          console.error('Erro ao verificar email:', err);
          res.status(500).json({ message: 'Erro ao verificar email' });
          return;
      }

      if (results.length > 0) {
          // O email já está em uso
          res.status(400).json({ error: 'Email já está em uso' });
          return;
      }

      // Verificar se o CNPJ já está em uso
      connection.query('SELECT * FROM usuarios WHERE cnpj = ?', [cnpj], (err, results) => {
          if (err) {
              console.error('Erro ao verificar CNPJ:', err);
              res.status(500).json({ message: 'Erro ao verificar CNPJ' });
              return;
          }

          if (results.length > 0) {
              // O CNPJ já está em uso
              res.status(400).json({ error: 'CNPJ já está em uso' });
              return;
          }

          // Se o email e o CNPJ não estão em uso, inserir o usuário no banco de dados
          const sql = 'INSERT INTO usuarios (nome, email, cnpj, telefone, cep, rua, numero, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
          connection.query(sql, [nome, email, cnpj, telefone, cep, rua, numero, senha], (err, result) => {
              if (err) {
                  console.error('Erro ao cadastrar usuário:', err);
                  res.status(500).json({ message: 'Erro ao cadastrar usuário' });
              } else {
                  console.log('Usuário cadastrado com sucesso');
                  res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
                  // Redirecionar para a página de login após o cadastro bem-sucedido
                  // res.redirect('/Entrar'); // Isso só funcionaria se você estivesse usando Express com renderização de páginas
              }
          });
      });
  });
});


// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://192.168.100.8:${port}`);
});
