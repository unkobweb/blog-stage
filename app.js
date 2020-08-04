const express = require("express");
const app = express();
const session = require("express-session");
const router = require("./routes/web");
require('dotenv').config();

console.log("ENV : "+process.env.NODE_ENV);
if (process.env.NODE_ENV == "production"){
  app.use(express.static(__dirname + '/build/prod'));
} else {
  app.use(express.static(__dirname + '/build/dev'));
}
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'blog_ynov_alex_2020',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
