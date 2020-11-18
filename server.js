const express = require('express');
const app = require("./app");
const path = require("path");

const port = process.env.PORT || 5000;

<<<<<<< HEAD
pp.listen(port, () => {
=======
app.listen(port, () => {
>>>>>>> d26866315080d44d2af91b5a76de97bcd7591514
    console.log(`Server is running on ${port}`)
})
