//Setting up our dependencies 
const express = require('express');
//were grabing the express function and then linking it to our app var so that we can use it throughout the script 
const app = express();
const port = 3200;
const cors = require('cors');
// passes information from the frontend to the backend
const bodyParser = require('body-parser');
// this is our middleware for talking to mongo db
const mongoose = require('mongoose');
// bcrypt for encrypting data (passwords) 
const bcrypt = require('bcryptjs');

//grab our config file  
const config = require('./config.json');

//Schemas 
// every schema needs a capital letter
const Project = require('./models/projects.js');

// Start our dependencies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

// ================================================================================================

// ===================
//      GET Method
// ===================

// here we are setting up the /allCoffee route
app.get('/allProject', (req, res) => {
    // .then is method in which we can chain functions on
    // chaining means that once something has run, then we can
    // run another thing
    // the result variable is being returned by the .find() then we ran earlier
    Project.find().then(result => {
        // send back the result of the search to whoever asked for it
        // send back the result to the front end. I.E the go the button
        res.send(result)
    })
})

// ================================================================================================


// ========================================
// ---------!!! ADD Method !!!-------------
// ========================================

// set up a route/endpoint which the frontend will access 
// app.post will send data to the database 
app.post(`/addProject`, (req, res) => {
    // create a new instance of the coffee schema 
    const newProject = new Project({
        // give our new coffee the details we sent from the frontend 
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        image_url: req.body.image_url,
        url: req.body.url
    });
    // to save the newcoffee to the database
    // use the variable declared above
    newProject.save()
        .then((result) => {
            console.log(`Added a new project successfully!`)
            // return back to the frontend what just happened
            res.send(result)
        })
        .catch((err) => {
            console.log(`Error: ${err.message}`)
        })
});

