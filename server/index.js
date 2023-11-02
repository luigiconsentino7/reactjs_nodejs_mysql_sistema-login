const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'bancodados'
});

app.use(express.json());
app.use(cors());

app.post("/cadastro", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if(err){
      res.send(err);
    }
    if(result.length == 0){
      bcrypt.hash(password, saltRounds, (erro, hash) => {
        db.query(
          "INSERT INTO usuarios (email, password) VALUE (?,?)",
          [email, hash],
          (error, response) => {
            if (err) {
              res.send(err);
            }
  
          res.send({msg: "Cadastrado com Sucesso!"});
          }
        );
      })
     
    }else{
      res.send({msg: "Usuário já cadastrado"});
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if(err){
      res.send(err);
    }
    if(result .length > 0){
      bcrypt.compare(password, result[0].password, (erro, result) => {
       if(result){
        res.send({msg: "Usuário logado com sucesso!"});
       }else{
        res.send({msg: "Senha está incorreta!"});
       }
      });
      
    }else{
      res.send({msg: "Conta não encontrada..."});
    }
  });
});




app.put("/alterar-senha", (req, res) => {
  const password = req.body.password;

  db.query("UPDATE password SET password = ?", [password], (err, result) => {
    if(err){
      res.send(err);
    }
    if(result.length == 0){
      bcrypt.hash(password, saltRounds, (erro, hash) => {
        db.query(
          "INSERT INTO usuarios (email, password) VALUE (?,?)",
          [email, hash],
          (error, response) => {
            if (err) {
              res.send(err);
            }
  
          res.send({msg: "Cadastrado com Sucesso!"});
          }
        );
      })
     
    }else{
      res.send({msg: "Usuário já cadastrado"});
    }
  });
});


app.listen(3001, () => {
  console.log("rodando na porta 3001");
});