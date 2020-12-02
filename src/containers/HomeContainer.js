import React, { Component } from "react";
import HeaderComponent from "../components/core/HeaderComponent";
import { getAllJobs, getJobDetailsById } from "../services/JobService";
import JobsComponent from "../components/job/JobsComponent";
import { trackPromise } from "react-promise-tracker";
import JobDetailsComponent from "../components/job/JobDetailsComponent";

class HomeContainer extends Component {
  componentDidMount() {
    if (this.props.jobId) {
      trackPromise(this.getJobById(this.props.jobId));
    } else {
      trackPromise(this.getJobs(this.props.search));
    }
  }

  //   componentDidUpdate(prevProps, prevState, snapshot) {
  //     if (
  //       prevProps.search.keyword !== this.props.search.keyword ||
  //       prevProps.search.location !== this.props.search.location
  //     ) {
  //       trackPromise(this.getJobs(this.props.search));
  //     }
  //   }

  state = {
    jobs: [],
    selectedJob: {},
  };

  getJobs = async (search) => {
    const jobs = await getAllJobs(search.keyword, search.location);
    console.log(jobs);
    this.setState({ jobs: jobs });
  };

  getJobById = async (id) => {
    const job = await getJobDetailsById(id);
    this.setState({ selectedJob: job });
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
        {this.props.jobId ? (
          <>
            <JobDetailsComponent
              jobId={this.props.jobId}
              job={this.state.selectedJob}
            />
          </>
        ) : (
          <>
            <div className="text-center">
              {(this.props.search.keyword || this.props.search.keyword) &&
                `Showing results for Keyword:${this.props.search.keyword} Location:${this.props.search.location}`}
            </div>
            <JobsComponent jobs={this.state.jobs} />
          </>
        )}
      </div>
    );
  }
}

HomeContainer.defaultProps = {
  search: {
    keyword: "",
    location: "",
  },
  jobId: "",
};

export default HomeContainer;
