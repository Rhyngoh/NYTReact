// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

var helpers = {

  runQuery: function(searchTerm, startYear, endYear) {
    var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";
    var articleCounter = 0;
    //var startYear = 0;
    //var endYear = 0;
    //$("#resultsSection").empty();
    //var searchTerm = document.getElementById("term").value().trim();
    var queryURL = queryURLBase + searchTerm;
    //startYear = document.getElementById("start").value().trim();
    //endYear = document.getElementById("end").value().trim();
    if(parseInt(startYear) || parseInt(startYear) != 0){
      queryURL = queryURL + "&begin_date=" + startYear + "0101";
    }
    if(parseInt(endYear) || parseInt(endYear) != 0){
      queryURL = queryURL + "&end_date=" + endYear + "0101";
    }
    return axios.get(queryURL).then(function(querydata){
      console.log(querydata.data.response.docs);
      return querydata.data.response.docs;
      });
  },

  saveToDB: function(title, date, url) {
  	console.log("inside the savetoDB function");
  	axios.post("/api", {title: title, date: date, url: url, saved: true})
  	.then(function(response) {
  		console.log("Successfully saved search");
  	});
  }
};

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
