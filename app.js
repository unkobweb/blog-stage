const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {console.log(`Express server running on port ${PORT}`)});