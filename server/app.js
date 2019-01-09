const express = require('express');
const graphqlHttp = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross-origin request (to communicate with other servers rather than localhost)
app.use(cors());

const PORT = process.env.PORT || 4000;

mongoose.connect('mongodb://elias:test123@ds047571.mlab.com:47571/gql-bookstore');
mongoose.connection.once('open',() =>{
    console.log('connected to database');
});

app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
