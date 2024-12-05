require('dotenv').config() // To retrieve env variables
const app = require("./app");


const protocol = process.env.PROTOCOL || 'http';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

//server

app.listen(port, function(){
    console.log("Server Listening on port " + port);
})