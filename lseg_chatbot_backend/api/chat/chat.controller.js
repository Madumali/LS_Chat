const express = require("express");
const router = express.Router();
const chatService = require("./chat.service");


//routes to endpoints
router.post('/create-chat', generateChatwithAI);

module.exports = router;

// controllers per each endpoint

// generate chat based on user input - typed text
function generateChatwithAI(req, res, next)

{
    console.log("chatsss",req.body)
    chatService.generateChatwithAI(req.body)
    .then((response) => {
        console.log("chats",response)
        res.json(response);
    })
    .catch(next);
}