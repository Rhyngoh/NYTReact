// Include the React library
var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the Route component for displaying individual routes
var Route = router.Route;

// Include the Router component to contain all our Routes
var Router = router.Router;

//Include browserHistory prop to configure client side routing
var hashHistory = router.hashHistory;

// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

// Reference the high-level components
var Main = require("../components/Main");
var Search = require("../components/Search");
var Saved = require("../components/Saved");

// Export the Routes
module.exports = (

  // The high level component is the Router component
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      {/* If user selects Search or Saved show the appropriate component */}
      <Route path="search" component={Search} />
      <Route path="saved" component={Saved} />

    </Route>
  </Router>

);