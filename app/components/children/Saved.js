// Include React
var React = require("react");
var helpers = require("./utils/helpers.js");
//var Saved = React.createClass({
var Saved = React.createClass({
  getInitialState: function(){
    return { savedArticles: ""};
  },

  //when the component mounts, get all saved articles from db
  componentDidMount: function(){
    helpers.getSaved().then(function(articleData){
      this.setState({ savedArticles: articleData.data });
      console.log("saved results", articleData.data);
    }.bind(this));
  },

  //handle deleting saved articles from database
  handleClick: function(item){
    helpers.deleteSaved(item.title, item.date, item.url).then(function(){
      helpers.getSaved().then(function(articleData){
        this.setState({ savedArticles : articleData.data });
      }.bind(this));
    }.bind(this));
  },

  //handle if there are no saved articles
  renderEmpty: function(){
    return(
      <li className="list-group-item">
        <h3>
          <span>
            <em>Search and save your first article!</em>
          </span>
        </h3>
      </li>
    );
  },

  //handle to show the articles and html
  renderArticles: function(){
    return this.state.savedArticles.map(function(article, index){
      return(
        <div key={index}>
          <li className="list-group-item">
            <h3>
              <span>
                <em>{article.title}</em>
              </span>
              <span className="btn-group pull-right">
                <a href={article.url} rel="noopener noreferrer" target="_blank">
                  <button className="btn btn-default">View Article</button>
                </a>
                <button className="btn btn-primary" onClick={() => this.handleClick(article)}>Delete</button>
              </span>
            </h3>
            <p>Date Published: {article.date}</p>
          </li>
        </div>
      );
    }.bind(this));
  },

  //handle to render a container with all articles inside
  renderContainer: function(){
    return(
      <div className="main-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-list-alt" aria-hidden="true"></i> Saved Articles</strong>
                </h1>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {this.renderArticles()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  // Here we render the component
  render: function() {
    if (!this.state.savedArticles){
      return this.renderEmpty();
    }
    return this.renderContainer();
  }
});

// Export the component back for use in other files
//module.exports = Saved;
module.exports = Saved;
