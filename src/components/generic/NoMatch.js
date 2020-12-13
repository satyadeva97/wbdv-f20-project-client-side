import React from "react";
import { Link } from "react-router-dom";

class NoMatchComponent extends React.Component {
  render() {
    return (
      <div className="container jumbotron">
        <h1 className="display-4">This is not a valid route</h1>
        <p className="lead">
          Click here to go to <Link to="/">HOME PAGE</Link>
        </p>
      </div>
    );
  }
}
export default NoMatchComponent;
