const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugiFy = require("slugify"); //string sem espaço e sem caractere especial
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/categories/new", (req, res) => {
    res.render('admin/categories/new');
});

//cria categoria
router.post("/categories/save", adminAuth,(req, res) => {
    const title = req.body.title;
    if(title != ""){
        Category.create({
            title: title,
            slug: slugiFy(title)
        }).then(() => {
            res.redirect("/admin/categories");
        }).catch(err => console.log(err));
    }else{
        // redireciona o user pra cadastrar novamente
        res.redirect("/admin/categories/new");
    }
});

router.get("/admin/categories", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {
            categories: categories
        });
    });
});

//delete categoria
router.post("/categories/delete", adminAuth, (req, res)=> {
    const id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            });
        }else{
            res.redirect("/admin/categories");
        }
    }else{
        res.redirect("/admin/categories");
    }
});

//editando categoria
router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
    const id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/categories");
    }

    Category.findByPk(id).then(category => {     /* Pesquisar por id - primary key */
        if(category != undefined){
            
            res.render("admin/categories/edit", {
                category: category
            });

        }else{
            res.redirect("/admin/categories");
        }
    }).catch(err => {
        console.log(err);
        res.redirect("/admin/categories");
    });
});


router.post("/categories/update", adminAuth, (req, res) => {
    const id = req.body.id;
    const title = req.body.title;

    Category.update({title: title, slug: slugiFy(title)}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/categories");
    });

});

module.exports = router;

