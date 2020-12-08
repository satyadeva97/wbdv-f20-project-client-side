import React from "react";
import JobsCardComponent from "../job/JobsCardComponent";
import "./home.scss";

class RecruiterHome extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h3>Posted Jobs ({this.props.jobs.length}):</h3>

          {this.props.jobs.length === 0 && <h5>No jobs Posted</h5>}

          {this.props.jobs && (
            <ul className="row flex-container wrap no-gutters">
              {this.props.jobs.map((job) => {
                return <JobsCardComponent key={job.id} job={job} />;
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

RecruiterHome.defaultProps = {
  jobs: [],
};
export default RecruiterHome;
