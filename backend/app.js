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
//!!!!! NEED TO SET UP DATABASE FIRST this will be someines login details for mongo db 

//Schemas 
// every schema needs a capital letter
const Project = require('./models/projects.js');

// Start our dependencies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors()); 

//start our server 
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

