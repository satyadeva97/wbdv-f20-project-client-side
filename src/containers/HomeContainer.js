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

  render() {
    return (
      <div className="container">
        <HeaderComponent />
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
              <JobsComponent
                jobs={this.state.jobs}
                search={this.props.search}
              />
            </div>
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
