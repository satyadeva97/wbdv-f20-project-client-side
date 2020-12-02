import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

const PrivateRoute = ({
  condition,
  message = "",
  component,
  redirectComponent,
  ...rest
}) => {
  const location = useLocation();

  return (
    <Route {...rest}>
      {condition ? (
        component
      ) : redirectComponent ? (
        redirectComponent
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location, message: message },
          }}
        />
      )}
    </Route>
  );
};

export default PrivateRoute;
