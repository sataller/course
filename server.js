const express = require("express");
const path = require("path");
const mysql = require("mysql");

const app = express();
app.use(express.json());


// app.use(express.static(path.join(__dirname, 'web-client/build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + 'web-client/build', 'index.html'));
// });
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})