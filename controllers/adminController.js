const path = require("path");
const mysql = require("mysql2");
const bcrypt = require("bcrypt")
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

module.exports = {connectionPage, connect, adminPage, addChapterPage, createChapter}