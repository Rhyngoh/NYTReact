// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Schema
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
mongoose.connect("mongodb://heroku_k5qsvdhg:vp77p3q7lqp5em3bq2s0er3q18@ds117849.mlab.com:17849/heroku_k5qsvdhg");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Routes
// ======

// Route to get all saved articles
app.get("/api/saved", function(req, res) {
  // Find all notes in the note collection with our Note model
  Article.find({}).exec(function(error, doc) {
    // Send any errors to the browser
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser
    else {
      res.send(doc);
    }
  });
});

// New article creation via POST route
app.post("/api/saved", function(req, res) {
  var newArticle = new Article(req.body);

  newArticle.save(function(err, doc){
    if (err) {
      console.log(err);
    }else{
      res.send(doc);
    }
  });
});

// Route to delete
app.delete("/api/saved/", function(req, res) {
  var url = req.param("url");
  Article.find({ url: url }).remove().exec(function(err){
    if(err){
      console.log(err);
    }else{
      res.send("Deleted");
    }
  });
});

// Any other routes, direct to react app
app.get("*", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});

// Listen
app.listen(process.env.PORT || 3000, function(){
  console.log("Application is listening!!");
});