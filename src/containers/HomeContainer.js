import React, { Component } from "react";
import HeaderComponent from "../components/core/HeaderComponent";
import {
  getAllJobs,
  getFeaturedJobs,
  getAllFeaturedJobs,
  getJobDetailsById,
  getFeaturedJobDetails,
  getApplicants,
} from "../services/JobService";
import JobsComponent from "../components/job/JobsComponent";
import JobDetailsComponent from "../components/job/JobDetailsComponent";

class HomeContainer extends Component {
  componentDidMount() {
    if (this.props.jobId) {
      this.getJobById(this.props.jobId);
    } else if (this.props.featuredJobId) {
      this.getFeaturedJobById(this.props.featuredJobId);
    } else {
      this.getJobs(this.props.search);
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
    featuredJobs: [],
  };

  getJobs = async (search) => {
    const jobs = await getAllJobs(search.keyword, search.location);
    const featuredJobs = await (search.keyword || search.location
      ? getFeaturedJobs(search.keyword, search.location)
      : getAllFeaturedJobs());
    this.setState({ jobs: jobs, featuredJobs: featuredJobs });
  };

  getJobById = async (id) => {
    let job = await getJobDetailsById(id);
    if (this.props.applied) {
      job = { ...job, applied: true };
    }
    this.setState({ selectedJob: job });
  };

  getFeaturedJobById = async (id) => {
    let job = await getFeaturedJobDetails(id);
    if (this.props.applied) {
      job = { ...job, applied: true };
    } else if (this.props.posted) {
      const applicants = await getApplicants(id);
      job = { ...job, posted: true, applicants };
    }
    this.setState({ selectedJob: job });
  };

  render() {
    return (
      <div className="container-fluid">
        <HeaderComponent />
        {this.props.jobId || this.props.featuredJobId ? (
          <>
            <JobDetailsComponent
              jobId={this.props.jobId || this.props.featuredJobId}
              job={this.state.selectedJob}
              history={this.props.history}
            />
          </>
        ) : (
          <>
            <div className="text-center">
              <JobsComponent
                jobs={this.state.jobs}
                featuredJobs={this.state.featuredJobs}
                search={this.props.search}
                history={this.props.history}
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
  featuredJobId: "",
  applied: false,
  posted: false,
};

export default HomeContainer;
