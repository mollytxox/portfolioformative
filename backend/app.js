//Setting up our dependencies 
const express = require('express');
//were grabing the express function and then linking it to our app var so that we can use it throughout the script 
const app = express();
const port = 3200;
const cors =  require('cors');
// passes information from the frontend to the backend
const bodyParser =  require('body-parser');
// this is our middleware for talking to mongo db
const mongoose =  require('mongoose');
// bcrypt for encrypting data (passwords) 
const bcrypt = require('bcryptjs');

//grab our config file  
const config = require('./config.json');

//Schemas 
// every schema needs a capital letter
const Project = require('./models/projects.js');

// Start our dependencies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors()); 

//start our server 
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
    
})

// connect to mongoDB cloud 
mongoose.connect(
    `mongodb+srv://${config.username}:${config.password}@cluster0.uc2us0c.mongodb.net/?retryWrites=true&w=majority`,
    //.then is a chaining method used with promises 
    //in simple terms, it will run something after the function before it 
).then(() => {
    console.log("you've connected to Mongo DB")
    //.catch is a method to "catch" any errors
}).catch((err) => {
    console.log(`DB connection error ${err.message}`)
})
