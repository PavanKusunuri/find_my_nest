import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) return <Redirect to="/login" />;
        if (roles && !roles.includes(user.role)) return <Redirect to="/" />;
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
