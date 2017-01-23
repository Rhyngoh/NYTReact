// Include React
var React = require("react");
var moment = require("moment");
var helpers = require("./utils/helpers.js");
var Results = React.createClass({
  // Here we render the component
  render: function() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title text-center"><strong><i className="fa  fa-table"></i>   Results</strong></h3>
        </div>
        <div className="panel-body text-center">
          {
            this.props.results.map(function(art, i){
            return(
              <div key={i} id={i}>
                <p key={art.headline.main}>
                  <a target="_blank" href={art.web_url}>
                    <em>{art.headline.main}</em>
                  </a> - {moment(art.pup_date).format("MMMM Do, YYYY")}
                <button className="btn btn-success" id={i} onClick={()=>this.props.save(art)}>Save</button>
                </p>
              </div>
              );
          }.bind(this)
          )
        }
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
