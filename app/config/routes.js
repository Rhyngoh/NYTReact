// Include the React library
var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the Route component for displaying individual routes
var Route = router.Route;

// Include the Router component to contain all our Routes
var Router = router.Router;

//Include browserHistory prop to configure client side routing
var browserHistory = router.browserHistory;

// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

// Reference the high-level components
var Main = require("../components/Main");
var Search = require("../components/children/Search");
//var Results = require("../components/children/Results");
var Saved = require("../components/children/Saved");


// Export the Routes
module.exports = (

  // The high level component is the Router component
  <Router history={browserHistory}>
    <Route path="/" component={Main}>

      {/* If user selects Search or Saved show the appropriate component */}
      <Route path="search" component={Search} />
      <Route path="saved" component={Saved} />

      {/* If user selects any other path... we get the Home Route */}
      <IndexRoute component={Search} />

    </Route>
  </Router>

);
//<Route path="results" component={Results} />