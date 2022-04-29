const express = require("express");
const app = express();
const connection = require("./database/database");
//Models
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//body parser
app.use(express.urlencoded({ extended: false }));
//json
app.use(express.json());

//database authentication
connection
  .authenticate()
  .then(() => {
    console.log("Connection with database completed!")
})
.catch((err) => {
    console.log(err);
})

//view engine
app.set("view engine", "ejs");

//static arquives
app.use(express.static("public"));

//mostrando todas as pgt.
app.get("/",(req, res) => {
  Pergunta.findAll({ raw: true, order:[ //SELECT * FROM
      ['id','DESC'] // ASC => Crescente e DESC => Decrescente
  ]}).then(perguntas => { //enviando pgts pra home
      res.render("index",{
          perguntas: perguntas
      });
  });
});

app.get("/perguntar",(req, res) => {
  res.render("perguntar");
})

//recebe dados do form
app.post("/salvarpergunta",(req, res) => {

  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  Pergunta.create({//INSERT INTO
      titulo: titulo,
      descricao: descricao
  }).then(() => {
      res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  //busca somente 1 dado (sequelize)
  Pergunta.findOne({
    where: { id: id }
  }).then(pergunta => {
    if (pergunta != undefined) { // Pergunta encontrada

      //busca todas as resp. p/ pgt procurada
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [
          ['id', 'DESC']
        ]
      }).then(respostas => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas
        });
      });

    } else {//page não encontrada
      res.redirect("/");
    }
  });
});

//respondendo pgt.
app.post("/responder",(req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;

  Resposta.create({
      corpo: corpo,
      perguntaId: perguntaId 
  }).then(() => {
      res.redirect("/pergunta/"+perguntaId);
  });
});

app.listen(8083, () => {
  console.log("Server is ok!");
});
