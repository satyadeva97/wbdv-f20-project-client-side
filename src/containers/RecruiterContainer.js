import React from "react";
import HeaderComponent from "../components/core/HeaderComponent";
import RecruiterHome from "../components/homepage/RecruiterHome";
import JobsPostComponent from "../components/job/JobPostComponent";
import { UserContext } from "../context";
import { getPostedJobs } from "../services/JobService";
import "./RecruiterContainer.scss";

class RecruiterContainer extends React.Component {
  componentDidMount() {
    if (!this.props.postJob) {
      this.getJobs();
    }
  }

  state = {
    postedJobs: [],
  };

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
          <RecruiterHome jobs={this.state.postedJobs} />
        )}
      </div>
    );
  }
}

RecruiterContainer.defaultProps = {
  postJob: false,
};

RecruiterContainer.contextType = UserContext;

export default RecruiterContainer;
