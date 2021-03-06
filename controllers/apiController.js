const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

function allExperiences(req, res) {
  connection.query("SELECT * FROM experiences", function (
    err,
    results,
    fields
  ) {
    res.send(results);
  });
}

function experience(req, res) {
  connection.query(
    "SELECT * FROM experiences WHERE id = ?",
    [req.params.id],
    function (err, results, fields) {
      let result = results[0];
      connection.query(
        "SELECT * FROM chapters WHERE company_id = ? ORDER BY number ASC",
        [req.params.id],
        function (err, results, fields) {
          result.chapters = results;
          res.send(result);
        }
      );
    }
  );
}

function getChapter(req, res) {
  let chapter;
  connection.query(
    "SELECT * FROM chapters WHERE id = ?",
    [req.params.id],
    (err, results, fields) => {
      chapter = results[0];
      connection.query(
        "SELECT * FROM chapters WHERE number = ? AND company_id = ?",
        [chapter.number - 1, chapter.company_id],
        (err, results, fields) => {
          console.log(results.length);
          chapter.prev = results.length > 0 ? results[0] : null;
          connection.query(
            "SELECT * FROM chapters WHERE number = ? AND company_id = ?",
            [chapter.number + 1, chapter.company_id],
            (err, results, fields) => {
              console.log(results.length);
              chapter.next = results.length > 0 ? results[0] : null;
              res.send(chapter);
            }
          );
        }
      );
    }
  );
}

function getAllChaptersAndExperiences(req, res) {
  connection.query(
    "SELECT e.id as company_id, e.company, c.id as chapter_id, c.title, c.number FROM experiences e LEFT JOIN chapters c ON c.company_id = e.id ORDER BY company_id, number",
    function (err, results, fields) {
      console.log(results);
      let response = [];
      let lastExp = null;
      results.forEach((result) => {
        if (lastExp != result.company) {
          lastExp = result.company;
          console.log(result);
          response.push({
            id: result.company_id,
            company: result.company,
            chapters:
              result.chapter_id != null
                ? [
                    {
                      id: result.chapter_id,
                      title: result.title,
                      number: result.number,
                    },
                  ]
                : [],
          });
        } else {
          response[response.length - 1].chapters.push({
            id: result.chapter_id,
            title: result.title,
            number: result.number,
          });
        }
      });
      res.send(response);
    }
  );
}

module.exports = {
  allExperiences,
  experience,
  getAllChaptersAndExperiences,
  getChapter,
};
