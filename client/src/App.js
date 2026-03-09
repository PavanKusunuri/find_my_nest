import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TenantDashboard from "./pages/TenantDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import BookingPage from "./pages/BookingPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/listings" component={Listings} />
          <Route exact path="/listings/:id" component={ListingDetail} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={TenantDashboard} roles={["tenant"]} />
          <PrivateRoute exact path="/owner/dashboard" component={OwnerDashboard} roles={["owner", "admin"]} />
          <PrivateRoute exact path="/owner/listings/new" component={CreateListing} roles={["owner", "admin"]} />
          <PrivateRoute exact path="/owner/listings/:id/edit" component={EditListing} roles={["owner", "admin"]} />
          <PrivateRoute exact path="/listings/:id/book" component={BookingPage} roles={["tenant"]} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
