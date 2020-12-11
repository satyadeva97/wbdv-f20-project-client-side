import React from "react";
import { Link } from "react-router-dom";
import JobsCardComponent from "../job/JobsCardComponent";
import "./home.scss";

class RecruiterHome extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h3 className="d-flex justify-content-between mt-1">
            <span>Posted Jobs ({this.props.jobs.length}):</span>
            <span>
              <Link to="postJob">
                <button className="btn btn-warning">Create Job</button>
              </Link>
            </span>
          </h3>

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
