import React from "react";
import "./footerComponent.scss";

class FooterComponent extends React.Component {
  render() {
    return (
      <nav className="navbar container navbar-light bg-light">
        <div className="row">
          <div className="col-2">
            <a href="/privacy">Privacy Policy</a>
          </div>
          <div className="col-1">About</div>
        </div>
      </nav>
    );
  }
}

export default FooterComponent;
