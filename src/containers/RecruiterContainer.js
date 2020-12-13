import React from "react";
import HeaderComponent from "../components/core/HeaderComponent";
import RecruiterHome from "../components/homepage/RecruiterHome";
import JobsPostComponent from "../components/job/JobPostComponent";
import { UserContext } from "../context";
import {
  getApplicants,
  getFeaturedJobDetails,
  getPostedJobs,
} from "../services/JobService";
import "./RecruiterContainer.scss";

class RecruiterContainer extends React.Component {
  componentDidMount() {
    if (!this.props.postJob) {
      if (this.props.postedJobId) {
        this.getFeaturedJobById(this.props.postedJobId);
      } else {
        this.getJobs();
      }
    }
  }

  state = {
    postedJobs: [],
    selectedJob: {},
  };

  getFeaturedJobById = async (id) => {
    const job = await getFeaturedJobDetails(id);
    const applicants = await getApplicants(id);

    this.setState({ selectedJob: { ...job, posted: true, applicants } });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.postJob !== this.props.postJob) {
      if (!this.props.postJob) {
        this.getJobs();
      }
    }
  }

  getJobs = async () => {
    const jobs = await getPostedJobs(this.context.user.id);
    this.setState({ postedJobs: jobs });
  };

  render() {
    return (
      <div className="container-fluid recuiter-container">
        <HeaderComponent />

        {this.props.postJob ? (
          <JobsPostComponent />
        ) : (
          <RecruiterHome
            jobs={this.state.postedJobs}
            getAllJobs={this.getJobs}
            postedJob={this.state.selectedJob}
            postedJobId={this.props.postedJobId}
          />
        )}
      </div>
    );
  }
}

RecruiterContainer.defaultProps = {
  postJob: false,
  postedJobId: "",
};

RecruiterContainer.contextType = UserContext;

export default RecruiterContainer;
