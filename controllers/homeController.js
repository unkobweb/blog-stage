const path = require("path");
const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

function index(req, res){
    res.sendFile(path.join(__dirname, "../views","index.html"));
}

}

