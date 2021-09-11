const express = require("express");
const app = express();

const questionRoute = require("./routes/question")
const categoryRoute = require("./routes/category")
app.use(express.json())
app.use('/questions', questionRoute)
app.use('/categories', categoryRoute)


module.exports = app