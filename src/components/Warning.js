import React from "react";
import { Link } from "react-router-dom";

class WarningComponent extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">
          <b>{this.props.message}</b>
        </h1>
        <p className="lead">
          Click here to <Link to="/signIn">LOGIN</Link>
        </p>
      </div>
    );
  }
}
export default WarningComponent;
