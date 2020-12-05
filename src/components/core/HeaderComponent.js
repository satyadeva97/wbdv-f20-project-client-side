import React from "react";
import "./HeaderComponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGlobeAmericas,
} from "@fortawesome/free-solid-svg-icons";

class HeaderComponent extends React.Component {
  state = {
    showToggle: false,
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light header">
          <a className="navbar-brand header-brand" href="/">
            <img
              src="/logo512.png"
              width="10"
              height="10"
              className="d-inline-block align-top"
              alt="logo"
              loading="lazy"
            />
            Job Man
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => {
              this.setState({ showToggle: !this.state.showToggle });
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${
              this.state.showToggle ? "show" : ""
            }`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Jobs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/recruiter">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="/"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Upload Resume
                </a>
              </li>
            </ul>
          </div>
          <div className="nav justify-content-end">
            <a className="bg-secondary text-white" href="/signIn">
              <button className="btn btn-secondary ">Sign-In</button>
            </a>
            <a className="bg-primary text-white ml-2" href="/signIn">
              <button className="btn btn-primary">Sign-Up</button>
            </a>
          </div>
        </nav>
      </>
    );
  }
}

export default HeaderComponent;
