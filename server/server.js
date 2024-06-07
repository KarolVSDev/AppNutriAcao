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
    telefone: req.body.telefone,
    zona: req.body.zona
  };

  const query = 'INSERT INTO pontos_coleta (nome, endereco, telefone, zona) VALUES (?, ?, ?, ?)';
  connection.query(query, [newPonto.nome, newPonto.endereco, newPonto.telefone, newPonto.zona], (error, results) => {
    if (error) {
      console.error('Erro ao inserir o ponto de coleta:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao salvar o ponto de coleta' });
      return;
    }

    const insertedId = results.insertId;
    res.status(201).json({ data: { id: insertedId, ...newPonto } });
  });
});



// Rota para cadastro de usuários normais
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
      }
    });
  });
});
});


// rota para cadastro de ongs 
app.post('/ongs', (req, res) => {
const { nome, email, cnpj, telefone, cep, rua, numero, senha } = req.body;

// Verificar se o email já está em uso
connection.query('SELECT * FROM ongs WHERE email = ?', [email], (err, results) => {
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
  connection.query('SELECT * FROM ongs WHERE cnpj = ?', [cnpj], (err, results) => {
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

    // Se o email e o CNPJ não estão em uso, inserir a ONG no banco de dados
    const sql = 'INSERT INTO ongs (nome, email, cnpj, telefone, cep, rua, numero, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [nome, email, cnpj, telefone, cep, rua, numero, senha], (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar ONG:', err);
        res.status(500).json({ message: 'Erro ao cadastrar ONG' });
      } else {
        console.log('ONG cadastrada com sucesso');
        res.status(200).json({ message: 'ONG cadastrada com sucesso' });
      }
    });
  });
});
});

// Rota para login de usuários e ONGs
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    console.error('Email e senha são obrigatórios');
    res.status(400).json({ error: 'Email e senha são obrigatórios' });
    return;
  }

  // Consulta SQL para verificar se o usuário existe na tabela de usuários
  const queryUser = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  connection.query(queryUser, [email, senha], (errorUser, resultsUser) => {
    if (errorUser) {
      console.error('Erro ao verificar usuário:', errorUser);
      res.status(500).json({ error: 'Erro interno do servidor ao verificar usuário' });
      return;
    }

    // Se o usuário foi encontrado na tabela de usuários
    if (resultsUser.length > 0) {
      const user = resultsUser[0];
      console.log('Usuário encontrado:', user);
      res.status(200).json({ message: 'Login bem-sucedido', data: user });
    } else {
      // Se o usuário não foi encontrado na tabela de usuários, verificar na tabela de ONGs
      const queryOng = 'SELECT * FROM ongs WHERE email = ? AND senha = ?';
      connection.query(queryOng, [email, senha], (errorOng, resultsOng) => {
        if (errorOng) {
          console.error('Erro ao verificar ONG:', errorOng);
          res.status(500).json({ error: 'Erro interno do servidor ao verificar ONG' });
          return;
        }

        // Se a ONG foi encontrada na tabela de ONGs
        if (resultsOng.length > 0) {
          const ong = resultsOng[0];
          console.log('ONG encontrada:', ong);
          res.status(200).json({ message: 'Login bem-sucedido', data: ong });
        } else {
          // Se nenhum usuário ou ONG foi encontrado
          console.log('Credenciais inválidas: Usuário/ONG não encontrado');
          res.status(401).json({ error: 'Credenciais inválidas: Usuário/ONG não encontrado' });
        }
      });
    }
  });
});


// Rota para retornar todos os usuários
app.get('/usuarios/todos', (req, res) => {
  const allUsersQuery = 'SELECT * FROM usuarios';
  connection.query(allUsersQuery, (error, allUsers) => {
    if (error) {
      console.error('Erro ao buscar todos os usuários:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao buscar todos os usuários' });
      return;
    }

    console.log('Todos os usuários:', allUsers);
    res.status(200).json(allUsers);
  });
});




// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://192.168.100.8:${port}`);
});