import React from "react";
import HeaderComponent from "../components/core/HeaderComponent";
import RecruiterHome from "../components/homepage/RecruiterHome";
import JobsPostComponent from "../components/job/JobPostComponent";
import { getAllJobs } from "../services/JobService";
import "./RecruiterContainer.scss";

class RecruiterContainer extends React.Component {
  componentDidMount() {
    if (!this.props.postJob) {
      this.getJobs({ keyword: "", location: "" });
    }
  }

  state = {
    jobs: [],
  };

  getJobs = async (search) => {
    const jobs = await getAllJobs(search.keyword, search.location);
    this.setState({ jobs: jobs });
  };

  render() {
    return (
      <div className="container-fluid recuiter-container">
        <HeaderComponent />

        {this.props.postJob ? (
          <JobsPostComponent />
        ) : (
          <RecruiterHome jobs={this.state.jobs} />
        )}
      </div>
    );
  }
}

RecruiterContainer.defaultProps = {
  postJob: false,
};
export default RecruiterContainer;
