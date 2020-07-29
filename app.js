const express = require("express");
const app = express();
const session = require("express-session");
const router = require("./routes/web");

app.use(express.static(__dirname + '/build'));
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
