import Express from "express";

const app = Express();

app.get('/', (req, res) => {
  //res.json({ message: 'Deu certo!' })
  res.send("<h1>Bem vindo ao guia do programador</h1>");
});

app.get("/blog/:artigo?", function (req, res) {

  var artigo = req.params.artigo; //param opcional

  if (artigo) {
    res.send("<h2>Artigo: " + artigo + " </h2>");
  } else {
    res.send("<h3>Bem vindo ao meu blog!: www.guiadoprogramador.com</h3>");
  }
});

app.get("/canal/youtube", function(req, res){
  var canal = req.query["canal"];//dados passados (cliente) na url

  if(canal){ //?canal=teste [queryparams]
      res.send(canal); 
  }else{
      res.send("Nenhum canal fornecido!");
  }
})

app.get("/ola/:nome/:empresa", function(req, res){
  // REQ => DADOS ENVIADOS PELO USUÁRIO
  // RES => RESPOSTA QUE VAI SER ENVIADA PARA O USUÁRIO
  var nome = req.params.nome; 
  var empresa = req.params.empresa;
  res.send("<h1>Oi " + nome +  " do " + empresa + " </h1>");
});


app.listen(9090, () => {
  console.log('Server is running!')
});
