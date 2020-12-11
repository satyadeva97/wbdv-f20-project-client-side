import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  condition,
  message = "",
  component,
  redirectComponent,
  ...rest
}) => {
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
            state: { from: rest.path, message: message },
          }}
        />
      )}
    </Route>
  );
};

export default PrivateRoute;
