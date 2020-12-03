import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGlobeAmericas,
} from "@fortawesome/free-solid-svg-icons";
import "./JobComponent.scss";

class JobSearchComponent extends React.Component {
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
        <form
          className="form-inline my-2 my-lg-0 job-search"
          onSubmit={this.onSearch}
        >
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
      </>
    );
  }
}

export default JobSearchComponent;
