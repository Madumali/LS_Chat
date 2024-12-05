//Only these origins are allowed to access the backend
const allowedOrigins = [

    `${process.env.PROTOCOL}://${process.env.HOST}:4001`,
    'http://localhost:5173'
];

module.exports = allowedOrigins