// Include React
var React = require("react");

var Results = React.createClass({
  // Here we render the component
  render: function() {

    return (

      <div className="container">

        <div className="row">

          <div className="col-lg-12">

            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title"><strong><i className="fa  fa-table"></i>   Results</strong></h3>
              </div>
              <div className="panel-body">
                {this.props.results.map(function(art){
                  return(
                    <div>
                      <h3 key="headline">{art.headline.main}</h3>
                      <h5 key="pubdate">{art.pub_date}</h5>
                      <a href={art.web_url} key="url">{art.web_url}</a>
                    </div>
                    );
                }.bind(this)
                );
              }
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
