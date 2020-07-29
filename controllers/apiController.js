const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

function allExperiences(req, res){
    connection.query("SELECT * FROM experiences", function(err, results, fields) {
        res.send(results);
    })
}

function experience(req, res){
    connection.query("SELECT * FROM experiences WHERE id = ?",[req.params.id], function(err, results, fields) {
        let result = results[0];
        connection.query("SELECT * FROM chapters WHERE company_id = ?",[req.params.id], function(err, results, fields){
            result.chapters = results;
            res.send(result);
        });
    });
}

function getAllChaptersAndExperiences(req, res){
    connection.query("SELECT e.id as company_id, e.company, c.id as chapter_id, c.title FROM experiences e LEFT JOIN chapters c ON c.company_id = e.id", function(err, results, fields){
        console.log(results);
        let response = []
        let lastExp = null;
        results.forEach(result => {
            if (lastExp != result.company){
                lastExp = result.company
                console.log(result)
                response.push({
                    id: result.company_id,
                    company: result.company,
                    chapters: result.chapter_id != null ? [{
                        id: result.chapter_id,
                        title: result.title
                    }] : []
                })
            } else {
                response[response.length-1].chapters.push({
                    id: result.chapter_id,
                    title: result.title
                })
            }
        })
        res.send(response)
    })
}

module.exports = {allExperiences, experience, getAllChaptersAndExperiences}