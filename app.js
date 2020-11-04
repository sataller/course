const express = require("express");
const mongoose = require("mongoose");
const authRotes = require("./routes/auth");
const keys = require("./config/keys");
const app = express();

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://astaller:pti4ka1996@cluster0.rfly8.mongodb.net/courseP?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

mongoose.connect(keys.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(()=> console.log("DB connected"))
    .catch(error => console.log(error));

app.use(express.json());

app.use('/api/auth', authRotes);

module.exports = app;
