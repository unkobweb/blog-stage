const path = require("path");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const imgConvert = require("image-convert");
const fs = require("fs");
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

function connectionPage(req, res){
    res.sendFile(path.join(__dirname, '../views', "connexion.html"));
}

function connect(req, res){
    connection.query("SELECT * FROM users WHERE username = ?",[req.body.username], (err, results, fields) => {
        if (results[0] !== undefined){
            bcrypt.compare(req.body.password, results[0].password, function(err, result) {
                if (result){
                    req.session.user = results[0];
                    res.send({type:"success", content: "Connecté !"});
                } else {
                    res.send({type: "danger", content: "Mauvais mot de passe"});
                }
            });
        } else {
            res.send({type: "danger", content: "Utilisateur non trouvé"});
        }
        
    })
    console.log(req.body);
}

function adminPage(req, res){
    if (req.session.user != undefined && req.session.user.role == 2){
        res.sendFile(path.join(__dirname, "../views", "admin.html"));
    } else {
        res.redirect("/connexion");
    }
}

function addChapterPage(req, res){
    if (req.session.user != undefined && req.session.user.role == 2){
        res.sendFile(path.join(__dirname, "../views", "addChapter.html"));
    } else {
        res.redirect("/connexion");
    }
}

function createChapter(req, res){
    console.log(req.body);
    let slug = req.body.title.toLowerCase();
    slug = slug.replace(/ +/gi, '_');
    if (req.body.image != ""){
        imgConvert.fromURL({
            url: req.body.image,
            quality: 100,
            output_format: "png",
        },function(err, buffer, file) {
            if(err){console.log(err)}
            else{
                fs.writeFile(path.join(__dirname,"../public/img/"+slug+".png"),buffer,(err,written,string) => {
                    if(err){console.log(err)}
                    console.log(file.name + " has been saved !");
                });
            }   
        })
    }
    connection.query("SELECT id FROM chapters WHERE company_id = ? ORDER BY number DESC LIMIT 1",[req.body.experience_id],function(err, results, fields){
        let {id} = results[0];
        connection.query("INSERT INTO chapters (title, content, company_id, slug, number) VALUES (?, ?, ?, ?, ?)",[req.body.title, req.body.content, req.body.experience_id, slug, id+1]);
        res.sendStatus(200);
    })
}

module.exports = {connectionPage, connect, adminPage, addChapterPage, createChapter}