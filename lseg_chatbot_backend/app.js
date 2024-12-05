const express = require("express"); //import express
const app = express(); //initialize express
const cors = require('cors'); //cross origin resourse sharing.a set of headers sent by server to browser 
const morgan = require('morgan'); //all requests going through this.nothing doing just logging
const credentials = require("./helpers/credentials");
const corsOptions = require("./config/corsOptions");

///Routes

const stockRoutes = require("./api/stock/stock.controller");
const chatRoutes = require("./api/chat/chat.controller");

app.use(morgan("dev"));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions)); 

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended: true})); //POST n PUT body requests

// built-in middleware for json 
app.use(express.json()); //convert json objects to js objects

//Routes using
app.use("/api/stock", stockRoutes);
app.use("/api/chat", chatRoutes);
//error handling for routes that cannot be found
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next();
 })
 module.exports = app;