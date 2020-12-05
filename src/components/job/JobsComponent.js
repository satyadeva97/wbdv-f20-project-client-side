import React from "react";
import "./JobComponent.scss";
import JobsCardComponent from "./JobsCardComponent";
class JobsComponent extends React.Component {
  render() {
    return (
      <div>
        {this.props.jobs.length === 0 && <h5>No jobs to show</h5>}

        {this.props.jobs && (
          <ul className="row flex-container wrap no-gutters">
            {this.props.jobs.map((job) => {
              return <JobsCardComponent key={job.id} job={job} />;
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default JobsComponent;
