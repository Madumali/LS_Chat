
const createError = require("http-errors");

async function generateChatwithAI(content) {
    //Format chat history for API request
    let history = content.history.map(({role, text}) => ({role, parts: [{ text }]}));
    const requestOptions = {
        method: 'POST',
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({contents : history})
    }
    try { 
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(process.env.API_URL, requestOptions);
        const data = await response.json();
        const botResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim(); //format the response
        return botResponse;
    } catch (e) {
       //catch other errors
        console.error(e);
        throw createError.InternalServerError();
    }

}
// .replace(/\*\*(.*?)\*\*/g, "$1").trim()
module.exports = { generateChatwithAI }