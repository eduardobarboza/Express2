const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'empresas_mineradoras'
});


connection.connect();


app.get('/empresa/:id', (req, res) => {
  const idEmpresa = req.params.id;
const sql = `SELECT * FROM empresa WHERE id = ?;`;


  connection.query(sql, [idEmpresa], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao consultar empresa' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Empresa não encontrada' });
      return;
    }

    res.json(results[0]);
  });
});


  

app.get('/', (req, res) => {
    res.json({ "rotas disponiveis" : ['/empresa', '/empresa/:id'] })
})

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});

