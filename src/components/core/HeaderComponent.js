import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import "./HeaderComponent.scss";

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
              {this.context.user.id && (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href={
                      this.context.user.type === "jobseeker"
                        ? "/profile"
                        : "/recruiter"
                    }
                  >
                    Profile
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="nav justify-content-end">
            {this.context.id ? (
              <>
                <a className="bg-secondary text-white" href="/signIn">
                  <button className="btn btn-secondary ">Sign-In</button>
                </a>
                <a className="bg-primary text-white ml-2" href="/signUp">
                  <button className="btn btn-primary">Sign-Up</button>
                </a>
              </>
            ) : (
              <>
                <Link to="/editProfile">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    id="profile"
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </>
    );
  }
}
HeaderComponent.contextType = UserContext;

export default HeaderComponent;
