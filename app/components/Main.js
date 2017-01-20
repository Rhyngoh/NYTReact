// Include React
var React = require("react");
var Results = require("./children/Results");
var Saved = require("./children/Saved");
var Search = require("./children/Search");
var helpers = require("./utils/helpers.js");
//Link component from react router to navigate within application without full page reload
var Link = require("react-router").Link;

//Main component
var Main = React.createClass({
  /*
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
  },*/

  // Here we render the component
  render: function() {
    return (
      <div className="main-container">
        <div className="container">
          <nav className="navbar navbar-default" role="navigation">
            <div className="container-fluid">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target=".navbar-ex1-collapse"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/">NYT-React</Link>
              </div>
              <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li><Link to="/search">Search</Link></li>
                  <li><Link to="/saved">Saved Articles</Link></li>
                </ul>
              </div>
            </div>
          </nav>
          
          <div className="jumbotron">
            <h1 className="text-center"><strong>New York Times Article Scrubber</strong></h1>
            <h2 className="text-center">Search for and save articles of interest!</h2>
            <Link to="/search">Search</Link>
            <Link to="/saved">Saved Articles</Link>
          </div>

          {this.props.children}

          <footer>
            <hr />
            <p className="pull-right">
              <i className="fa fa-github" aria-hidden="true"></i>
              Build using React.js
            </p>
          </footer>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
