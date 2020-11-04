const express = require("express");
const mongoose = require("mongoose");
const authRotes = require("./routes/auth");
const keys = require("./config/keys");
const app = express();

mongoose.connect('mongodb+srv://astaller:MnT9cUwx4Fi1sqUf@cluster0.rfly8.mongodb.net/courseP?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,})
    .then(() => console.log("DB connected"))
    .catch(error => console.log(error));

app.use(express.json());

app.use('/api/auth', authRotes);

module.exports = app;
