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
    slug = slug.replace(/[^a-zA-Z]/gi, '');
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

function moveChapter(req, res){
    let {experienceId, chapterId, way} = req.body;
    console.log(req.body);
    if (way == "up"){
        connection.query("SELECT * FROM chapters WHERE company_id = ? AND number = ? LIMIT 1",[experienceId,chapterId-1],(err, results, fields) => {
            let impactedChapter = results[0];
            console.log(impactedChapter);
            connection.query("UPDATE chapters SET number = ? WHERE number = ?",[chapterId-1, chapterId]);
            connection.query("UPDATE chapters SET number = ? WHERE id = ?",[chapterId,impactedChapter.id]);
            connection.query("SELECT * FROM chapters ORDER BY company_id, number ASC",(err, results, fields)=>{
                res.sendStatus(200);
            })
        });
    } else {
        connection.query("SELECT * FROM chapters WHERE company_id = ? AND number = ? LIMIT 1",[experienceId,chapterId+1],(err, results, fields) => {
            let impactedChapter = results[0];
            console.log(impactedChapter);
            connection.query("UPDATE chapters SET number = ? WHERE number = ?",[chapterId+1, chapterId]);
            connection.query("UPDATE chapters SET number = ? WHERE id = ?",[chapterId,impactedChapter.id]);
            connection.query("SELECT * FROM chapters ORDER BY company_id, number ASC",(err, results, fields)=>{
                res.sendStatus(200);
            })
        });
    }
}

function modifyChapterPage(req, res){
    if (req.session.user != undefined && req.session.user.role == 2){
        res.sendFile(path.join(__dirname, "../views", "modifyChapter.html"));
    } else {
        res.redirect("/connexion");
    }
}

function changeChapter(req, res){
    connection.query("UPDATE chapters SET content = ?, title = ? WHERE id = ?",[req.body.content, req.body.title, req.body.chapter_id])
    res.redirect("/admin");
}

function deleteChapter(req, res){
    connection.query("SELECT * FROM chapters INNER JOIN experiences EX ON EX.id = chapters.company_id WHERE chapters.id = ?",[req.params.id],(err, results, fields)=>{
        let experience = results[0];
        connection.query("DELETE FROM chapters WHERE id = ?",[req.params.id],(err, results, fields)=>{
            connection.query("UPDATE chapters SET number=number-1 WHERE number > ? AND company_id = ?",[experience.number,experience.id])
            res.sendStatus(200);
        })
    })
}

module.exports = {connectionPage, connect, adminPage, addChapterPage, createChapter, moveChapter, modifyChapterPage, changeChapter, deleteChapter}