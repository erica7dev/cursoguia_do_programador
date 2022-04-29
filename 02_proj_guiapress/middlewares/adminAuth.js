
function adminAuth(req, res, next){ //next da continuação a requisição e passa req. p/ rota

  if(req.session.user != undefined){
      next();
  }else{
      res.redirect('/login');
  }
}

module.exports = adminAuth;

//método que fica entre req. e res.