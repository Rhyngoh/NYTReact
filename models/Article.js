// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

// Create a UserSchema with the Schema class
var ArticleSchema = new Schema({
  // name: a unique String
  title: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

// Create the User model with the UserSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the user model
module.exports = Article;
