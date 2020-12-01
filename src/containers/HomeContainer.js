import React, { Component } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { getAllJobs } from "../services/JobService";
import JobsComponent from "../components/JobsComponent";
import { trackPromise } from "react-promise-tracker";

class HomeContainer extends Component {
  componentDidMount() {
    if (this.props.search) {
      trackPromise(this.getJobs(this.props.search));
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.search.keyword !== this.props.search.keyword ||
      prevProps.search.location !== this.props.search.location
    ) {
      trackPromise(this.getJobs(this.props.search));
    }
  }

  state = {
    jobs: [],
  };

  getJobs = async (search) => {
    const jobs = await getAllJobs(search.keyword, search.location);
    console.log(jobs);
    this.setState({ jobs: jobs });
  };

  onJobSearch = ({ keyword = "", location = "" }) => {
    this.props.history.push(
      `/search/keyword/${keyword ? keyword : "%20"}/location/${
        location ? location : "%20"
      }/`
    );
  };

  render() {
    return (
      <div className="container">
        <HeaderComponent onSearch={this.onJobSearch} />
        <div className="text-center">
          {(this.props.search.keyword || this.props.search.keyword) &&
            `Showing results for Keyword:${this.props.search.keyword} Location:${this.props.search.location}`}
        </div>
        <JobsComponent jobs={this.state.jobs} />
      </div>
    );
  }
}

HomeContainer.defaultProps = {
  search: {
    keyword: "",
    location: "",
  },
};

export default HomeContainer;
