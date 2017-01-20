// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

var helpers = {

  runQuery: function(searchTerm, startYear, endYear) {
    var formatTerm = searchTerm.trim();
    var formatStart = startYear.trim() + "0101";
    var formatEnd = endYear.trim() + "1231";
    //Run query using Axios. Then return the results as an object with an array.
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json",
      {
        params: {
          "api-key": authKey,
          "q": formatTerm,
          "begin_date": formatStart,
          "end_date": formatEnd
        }
      }).then(function(querydata){
        console.log("Axios Results", querydata.data.response);
        return querydata.data.response;
      });
  },
  //get any saved articles from database
  getSaved: function(){
    return axios.get("/api/saved")
      .then(function(results){
        console.log("axios results", results);
        return results;
      });
  },
  //post a saved article to the database
  saveToDB: function(title, date, url) {
  	axios.post("/api/saved", {title: title, date: date, url: url})
  	.then(function(response) {
  		console.log("Successfully saved search", response.data._id);
      return response.data._id;
  	});
  },
  deleteSaved: function(title, date, url){
    return axios.delete("/api/saved", {
      params: {
        "title" : title,
        "date" : date,
        "url" : url
      }
    }).then(function(results){
      console.log("axios results", results);
      return results;
    });
  }
};

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
