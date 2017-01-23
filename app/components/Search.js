// Include React
var React = require("react");
var Results = require("./Results");
var helpers = require("./utils/helpers.js");
var Search = React.createClass({
  getInitialState: function(){
    return {
      term: "",
      start: 0,
      end: 0,
      results: [],
      query: ""
    };
  },
  setQuery: function(query){
    this.setState({query: query});
  },
  handleSubmit: function(event){
    event.preventDefault();
    this.setQuery({term: this.state.term, start:this.state.start, end:this.state.end});

  },
  componentDidUpdate: function(prevProps, prevState){
      if(prevState.query != this.state.query){
      helpers.runQuery(this.state.query).then(function(data){
        //limit to 5 results
        data.length = 5;
        this.setState({results:data});
      }.bind(this))
    }
  },
  handleChange: function(event){
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },
  // Here we render the component
  render: function() {
    return (
      <div className="searchContainer">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title text-center"><strong><i className="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
          </div>
          <div className="panel-body text-center">
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div className="row">
                  <label className="col-md-2 control-label" htmlFor="term">Search Term:</label>
                  <div className="col-md-9">
                    <input type="text" className="form-control" id="term" value={this.state.term} onChange={this.handleChange} required/>
                  </div>
                </div>
                <div className="row">
                  <label className="col-md-2 control-label" htmlFor="start">Start Year:</label>
                  <div className="col-md-9">
                    <input type="number" className="form-control" id="start" value={this.state.start} onChange={this.handleChange} required/>
                  </div>
                </div>
                <div className="row">
                  <label className="col-md-2 control-label" htmlFor="end">End Year:</label>
                  <div className="col-md-9">
                    <input type="number" className="form-control" id="end" value={this.state.end} onChange={this.handleChange} required/>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <button type="submit" className="btn btn-default btn-block"><i className="fa fa-search"></i> Search</button>
            </form>
          </div>
        </div>
        <Results results = {this.state.results} save={this.props.save}/>
      </div>
    )}
});
// Export the component back for use in other files
module.exports = Search;
