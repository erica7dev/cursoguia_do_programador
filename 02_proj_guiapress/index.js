const express = require("express");
const app = express();
const connection = require("./database/database");
const session = require('express-session'); //sessions & cookies

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Controllers
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./users/UsersController');

//Models
const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

//database
connection
  .authenticate()
  .then(() => {
    console.log("Connected Database");
  })
  .catch((err) => console.log(err));

//session
app.use(session({
  secret: "uerfhyery378unlmko", //"senha" da sessão, semelhante ao salt 
  cookie: {maxAge: 30000000} //cookie de identificação, e tempo de expiração medido em ms; forma como cookie é guardado no nav
}))

app.use('/', categoriesController);
app.use('/', articlesController);
app.use('/', usersController);

app.get("/", (req, res) => {
  Article.findAll({
      order: [
          ['id', 'DESC']
      ],
      limit: 4
  }).then(articles => {

      Category.findAll().then(categories => {
          res.render("index", {
              articles: articles,
              categories: categories
          });
      });

  });
});

app.get('/:slug', (req, res) => {
  const slug = req.params.slug;
  Article.findOne({
      where: {
          slug: slug
      }
  }).then(article => {
      if(article != undefined){
          Category.findAll().then(categories => {
              res.render("article", {
                  article: article,
                  categories: categories
              });
          });
  
      }else{
          res.redirect("/");
      }
  }).catch(err => {
      console.log(err);
      res.redirect("/")
  })
});

app.get("/category/:slug", (req, res) => {
  const slug = req.params.slug;
  console.log(slug);
  Category.findOne({
      where: {
          slug: slug
      },
      include: [{model: Article}]
  }).then(category => {
      if(category != undefined){
      
          Category.findAll().then(categories => {
              res.render("index", {
                  articles: category.articles,
                  categories: categories
              })
          });

      }else{
          res.redirect("/");
      }
  }).catch(err => {
      console.log(err)
  });
});

app.use(express.static("public"));

app.set("view engine", "ejs");

app.listen(8080, () => {
  console.log("Start server!");
});
