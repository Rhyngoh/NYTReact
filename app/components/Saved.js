// Include React
var React = require("react");
var helpers = require("./utils/helpers.js");
var moment = require("moment");
//var Saved = React.createClass({
var Saved = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title text-center">Saved Articles</h3>
            </div>
            <div className="panel-body text-center">
              {
                this.props.savedArticles.map(function(obj, i){
                  return <div key={i} id={i}><p key={obj.title}><a target="_blank" href={obj.url}><em>{obj.title}</em></a> - {moment(obj.date).format("MMMM Do, YYYY")}   <button className="btn btn-primary" id={i} onClick={()=>this.props.delete(obj)}>Delete</button></p></div>
                }.bind(this))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
});

// Export the component back for use in other files
//module.exports = Saved;
module.exports = Saved;
