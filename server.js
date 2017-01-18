/* Mongoose's "Populated" Method (18.3.7)
 * =============================================== */

// STUDENTS:
// Scroll down to the bottom of this server file for your TODO assigment.
// It's located in the route "populateduser"

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Bring in our Models: Not and User
var Article = require("./models/Article.js");
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// We'll create a new user by using the User model as a class
// The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
/*var exampleUser = new User({
  name: "Ernest Hemingway"
});
// Using the save method in mongoose, we create our example user in the db
exampleUser.save(function(error, doc) {
  // Log any errors
  if (error) {
    console.log(error);
  }
  // Or log the doc
  else {
    console.log(doc);
  }
});*/


// Routes
// ======

// Simple index route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Route to see notes we have added
app.get("/api/saved", function(req, res) {
  // Find all notes in the note collection with our Note model
  Article.find({saved: true}, function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Or send the doc to the browser
    else {
      res.send(doc);
    }
  });
});

// New note creation via POST route
app.post("/api/saved", function(req, res) {
  console.log(req.body);
  var searchInput = req.body.title;
  var searchDate = req.body.date;
  var searchUrl = req.body.url;

  var savedArticle = new Article({title: searchInput, date: searchDate, url: searchUrl, saved: true});
  savedArticle.save(function(err, doc){
    if (err) {
      res.send(err);
    }else{
      Article.findOneAndUpdate({
        title: searchInput
      }, {
        $set: {
          date: searchDate,
          url: searchUrl,
          saved: true
        }
      }, {upsert: true}).exec(function(error){
        if(error) throw error;
      });
    }
  });

});

// Route to delete
app.get("/api/saved/:id", function(req, res) {
  Article.remove({
    "_id": mongojs.ObjectID(req.params.id)
  }, function(error, removed){
    if(error){
      console.log(error);
      res.send(error);
    }else{
      console.log(removed);
      res.send(removed);
    }
  });
});
/*app.get("*", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});*/


// Listen on Port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
