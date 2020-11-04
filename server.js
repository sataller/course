const port = process.env.PORT || 5000;
const app = require("./app");
const path = require("path");

// pass: Lxr7FS4Nc7t0cKCc


// app.use(express.static(path.join(__dirname, 'web-client/build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + 'web-client/build', 'index.html'));
// });
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})