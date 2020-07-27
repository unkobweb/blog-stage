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
module.exports = {allExperiences, experience}