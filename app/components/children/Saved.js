// Include React
var React = require("react");

var Saved = React.createClass({

  // Here we render the component
  render: function() {

    return (

      <div className="container">

        <div className="row">

          <div className="col-lg-12">

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Saved Articles</strong></h3>
              </div>
              <div className="panel-body" id="savedArticles">
                
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;
