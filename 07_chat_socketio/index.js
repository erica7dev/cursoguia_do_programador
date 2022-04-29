const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on("connection", socket => {
  socket.on("disconnect", () => {
      console.log("X desconectou: " + socket.id);
  });
  
  socket.on("msg", data => {
      io.emit("showMsg", data);
      console.log(data);
  })
  //  io => servidor inteiro
  //socket => user 
  // socket.broadcast.emit => mesma coisa que o io.emit, mas não exibe a msg p/ quem enviou
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

http.listen(3000, () => {
  console.log('Deu certo!')
})
