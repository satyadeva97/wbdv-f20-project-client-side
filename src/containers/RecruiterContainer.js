import React from "react";
import HeaderComponent from "../components/core/HeaderComponent";
import JobsPostComponent from "../components/job/JobPostComponent";
import "./RecruiterContainer.scss";

class RecruiterContainer extends React.Component {
  render() {
    return (
      <div className="recuiter-container">
        <HeaderComponent onSearch={this.onJobSearch} />

        {this.props.postJob && <JobsPostComponent />}
      </div>
    );
  }
}

RecruiterContainer.defaultProps = {
  postJob: false,
};
export default RecruiterContainer;
