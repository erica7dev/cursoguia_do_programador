const express = require('express');
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugiFy = require('slugify');
const adminAuth = require("../middlewares/adminAuth");

router.get('/admin/articles', adminAuth, (req, res) => {
    Article.findAll({
        include: [{model: Category}] //inclui categoria na busca. Relacionamento 1 - n
    }).then(articles => {
        res.render("admin/articles/index", {
            articles: articles
        });
    });
});

router.get("/admin/articles/new", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {
            categories: categories
        });
    })
});

//novo artigo
router.post("/articles/save", adminAuth,(req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;

    Article.create({
        title: title,
        slug: slugiFy(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect('/admin/articles');
    });

})

//deletando artigo
router.post("/admin/articles/delete", adminAuth,(req, res)=> {
    const id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });
        }else{
            res.redirect("/admin/articles");
        }
    }else{
        res.redirect("/admin/articles");
    }
});

//editando artigo
router.get("/admin/articles/edit/:id", adminAuth,(req, res) => {
    const id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/articles");
    }
    Article.findByPk(id).then(article => { //pesquisando por id
        if(article != undefined){

            Category.findAll().then(categories => {
                res.render("admin/articles/edit", {
                    article: article,
                    categories: categories
                });
            });

        }else{
            res.redirect("/admin/articles");
        }
    }).catch(err => {
        console.log(err);
        res.redirect("/admin/articles");
    });
});

router.post("/admin/articles/update", adminAuth,(req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;

    Article.update({title: title, body: body, categoryId: category, slug: slugiFy(title)}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch(err => {
        console.log(err);
        res.redirect("/admin/articles");
    });

});

router.get("/articles/page/:num", (req, res) => {
    const page = req.params.num;
    var offset = 0;

    if(isNaN(page) || page == 1){
        offset = 0;
    }else{
        offset = (parseInt(page) - 1) * 4;
    }

    Article.findAndCountAll({  //findAndCountAll => todos os artigos e qtd de elementos nos artigos
        limit: 4, // Limita a qtd. de elementos retornados
        // Retorna um artigo após x artigo (x = num)
        offset: offset,
        order: [
            ['id', 'DESC']
        ],
    }).then(articles => {
        var next; // Verifica se tem uma próx. pág
        if(offset + 4 >= articles.count){ // articles.count => vem de findAndCountAll
            next = false;
        }else{
            next = true;
        }
        const result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page", {
                result: result,
                categories: categories
            })
        });
    });

});


module.exports = router;

