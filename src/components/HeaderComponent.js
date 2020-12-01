import React from "react";
import "./HeaderComponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGlobeAmericas,
} from "@fortawesome/free-solid-svg-icons";

class HeaderComponent extends React.Component {
  state = {
    keyword: "",
    location: "",
  };

  onSearch = () => {
    this.props.onSearch({ ...this.state });
    this.setState({
      keyword: "",
      location: "",
    });
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light header">
          <a className="navbar-brand" href="/">
            Job Panda
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Profile</a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="#"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Upload Resume
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0" onSubmit={this.onSearch}>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="keywordIcon">
                    <FontAwesomeIcon icon={faBriefcase} />
                  </span>
                </div>
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search by Keyword"
                  aria-label="Search"
                  id="keyword"
                  onChange={(e) => this.setState({ keyword: e.target.value })}
                  value={this.state.keyword}
                />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="locationIcon">
                    <FontAwesomeIcon icon={faGlobeAmericas} />
                  </span>
                </div>
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search by Location"
                  aria-label="Search"
                  id="location"
                  onChange={(e) => this.setState({ location: e.target.value })}
                  value={this.state.location}
                />
              </div>

              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </>
    );
  }
}

export default HeaderComponent;
