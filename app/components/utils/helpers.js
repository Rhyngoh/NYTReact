// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
var querystring = require("querystring");
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?apikey=" + authKey + "&q=";
var helpers = {
  runQuery: function(query) {
    var queryURL = queryURLBase + query.term + "&begin_date=" + query.start + "0101&end_date=" + query.end + "1231";
    //Run query using Axios. Then return the results as an object with an array.
    return axios.get(queryURL).then(function(querydata){
        console.log("Axios Results", querydata.data.response.docs);
        return querydata.data.response.docs;
      });
  },
  //get any saved articles from database
  getSaved: function(){
    return axios.get("/api/saved")
      .then(function(results){
        console.log("axios results");
        return results.data;
      });
  },
  //post a saved article to the database
  saveToDB: function(title, date, url) {
  	return axios.post("/api/saved", querystring.stringify({title: title, date: date, url: url}))
  	.then(function(response) {
  		console.log("Successfully saved search");
  	});
  },
  deleteSaved: function(title){
    return axios({
      method: "post",
      url: "/api/saved/delete",
      data: querystring.stringify({title: title})
    }).then(function(results){
      console.log("deleted article");
    })
  }
};

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
