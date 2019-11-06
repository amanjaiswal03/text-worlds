const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
//const key = require('./key.js')
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./routes/auth')

dotenv.config();

//Routes Middleware
app.use('/api/user', authRoute)

app.use(cors()) // not having cors enabled will cause an access control error

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });

mongoose.connection.once('open', () => {
    console.log('connected to the database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for request on port 4000');
})


app.post('/login', (req, res) => {
    jwt.sign();
});

app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.send("Hello there")
});