// Include React
var React = require("react");
var Query = require("./Search/query.js");
var Results = require("./Search/results.js");
var helpers = require("./utils/helpers.js");
var Search = React.createClass({
  getInitialState: function(){
    return {
      term: "",
      start: 0,
      end: 0
    };
  },
  handleChange: function(event){
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },
  handleSubmit: function(event){
    //event.preventDefault();
    this.props.setTerm(this.state.term);
    this.props.setStart(this.state.start);
    this.props.setEnd(this.state.end);
    this.setState({term: "", start: 0, end: 0});
  },
  // Here we render the component
  render: function() {

    return (

      <div className="container">

        <div className="row">

          <div className="col-lg-12">

            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
              </div>
              <div className="panel-body">
                <form role="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="search">Search Term:</label>
                    <input type="text" className="form-control" id="term" value={this.state.term} onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="start">Start Year (Optional):</label>
                    <input type="text" className="form-control" id="start" value={this.state.start} onChange={this.handleChange}/>
                  </div>
                  <div className="<for></for>m-group">
                    <label htmlFor="end">End Year (Optional):</label>
                    <input type="text" className="form-control" id="end" value={this.state.end} onChange={this.handleChange}/>
                  </div>
                  <button type="submit" className="btn-lg btn-default"><i className="fa fa-search"></i> Search</button>
                </form>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Search;
