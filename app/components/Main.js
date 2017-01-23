// Include React
var React = require("react");
var helpers = require("./utils/helpers.js");

//Main component
var Main = React.createClass({
  getInitialState: function(){
    return { saved: [] };
  },
  componentWillMount: function(){
    helpers.getSaved().then(function(data){
      this.setState({saved:data});
    }.bind(this));
  },
  saveArticle: function(saving){
    helpers.saveToDB(saving.headline.main, saving.pub_date, saving.web_url);
    if(this.state.saved){
      var oldState = this.state.saved;
      oldState.push({title:saving.headline.main, date: saving.pub_date, url: saving.web_url});
      this.setState({saved:oldState});
    }
  },
  deleteArticle: function(art){
    helpers.deleteSaved(art.title);
    var oldState = this.state.saved;
    for(var i = 0; i < oldState.length; i++){
      if(oldState[i].title === art.title){
        oldState.splice(i,1);
      }
    }
    this.setState({saved:oldState});
  },
  // Here we render the component
  render: function() {
    return (
      <div className="main-container">
        <div className="container">
          <div className="jumbotron">
            <h1 className="text-center"><strong>New York Times Article Scrubber</strong></h1>
            <h2 className="text-center">Search for and save articles of interest!</h2>
            <a className="btn btn-success" href="#/search">Search for Articles</a>
            <a className="btn btn-danger" href="#/saved">Go to Saved Articles</a>
          </div>
          <div className="container">
            {this.props.children && React.cloneElement(this.props.children, {save:this.saveArticle, savedArticles: this.state.saved, delete: this.deleteArticle})}
          </div>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;