// Include React as a dependency
var React = require("react");
var helpers = require("./utils/helpers.js");

// Results Component Declaration
var Results = React.createClass({

  // Here we will save states for the contents we save
  getInitialState: function() {
    return {
      title: "",
      url: "",
      pubdate: ""
    };
  },

  // This code handles the sending of the search terms to the parent Search component
  handleClick: function(item) {
    console.log(item);
    helpers.postSaved(item.headline.main, item.pub_date, item.web_url).then(function() {
      console.log(item.web_url);
    });
  },

  // A helper method for mapping through our articles and outputting some HTML
  renderArticles: function() {
    return this.props.results.docs.map(function(article, index) {
      // Each article thus reperesents a list group item with a known index
      return (
        <div key={index}>
          <li className="list-group-item">
            <h3>
              <span>
                <em>{article.headline.main}</em>
              </span>
              <span className="btn-group pull-right">
                <a href={article.web_url} rel="noopener noreferrer" target="_blank">
                  <button className="btn btn-default ">View Article</button>
                </a>
                <button className="btn btn-primary" onClick={() => this.handleClick(article)}>Save</button>
              </span>
            </h3>
            <p>Date Published: {article.pub_date}</p>
          </li>
        </div>
      );
    }.bind(this));
  },

  // A helper method for rendering a container to hold all of our articles
  renderContainer: function() {
    return (
      <div className="main-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-list-alt"></i>
                    Results
                  </strong>
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
  render: function() {
    // If we have no articles, render this HTML
    if (!this.props.results.docs) {
      return (
        <li className="list-group-item">
          <h3>
            <span>
              <em>Enter search terms to begin...</em>
            </span>
          </h3>
        </li>
      );
    }
    // If we have articles, return this.renderContainer() which in turn, returns all the articles
    return this.renderContainer();
  }
});

// Export the module back to the route
module.exports = Results;