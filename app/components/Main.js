// Include React
var React = require("react");
var Results = require("./children/Results");
var Saved = require("./children/Saved");
var Search = require("./children/Search");
var helpers = require("./utils/helpers.js");

var Main = React.createClass({
  getInitialState: function(){
    return { searchTerm: "", startYear: 0, endYear: 0, results: ""};
  },
  componentDidUpdate: function(prevState){
    console.log("Updated component");
    if(prevState.searchTerm !== this.state.searchTerm){
      helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endYear).then(function(data){
        console.log("Posted to mongodb");
        console.log(data);
        data.length = 5;
        this.setState({ results: data});
      }.bind(this));
    }
  },
  saveArticle: function(saving){
    helpers.saveToDB(saving.headline.main, saving.pub_date, saving.web_url);
    if(this.state.saved){
      var oldState = this.state.saved;
      oldState.push({title:saving.headline.main, date: saving.pub_date, url: saving.web_url});
      this.setState(oldState);
    }
  },
  setTerm: function(term){
    this.setState({ searchTerm: term});
  },
  setStart: function(start){
    this.setState({ startYear: start});
  },
  setEnd: function(end){
    this.setState({ endYear: end});
  },
  // Here we render the component
  render: function() {

    return (
      <div className="container">

        <div className="row">

          <div className="jumbotron">
            <h1>New York Times Article Scrubber</h1>
            <p><em>Search for and annotate articles of interest!</em></p>
            <a href="#/search"><button className="btn btn-default">Search</button></a>
            <a href="#/saved"><button className="btn btn-default">Saved Articles</button></a>
          </div>

          <div className="container">

            {/* Added this.props.children to dump all of the child components into place */}
            {/*this.props.children*/}
            <Search setTerm={this.setTerm} setStart={this.setStart} setEnd={this.setEnd} />
            <Results results={this.state.results}/>
          </div>
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
