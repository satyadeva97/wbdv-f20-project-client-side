import React from "react";
import "./JobComponent.scss";

class JobDetailsComponent extends React.Component {
  renderJob = (job) => {
    return (
      <div className="card job-description">
        <div className="row card-header job-header align-center">
          <div className="col">
            <img src={job.company_logo || "/altImage.png"} alt={job.company} />

            <h5>
              <a href={job.company_url} target="_blank" rel="noreferrer">
                {job.company}
              </a>
              ({job.type})
            </h5>
          </div>
          <div className="col col-sm-1 ">
            <button className="btn btn-danger">Apply</button>
          </div>
        </div>
        <div className="card-body">
          <p dangerouslySetInnerHTML={{ __html: job.description }}></p>
        </div>
      </div>
    );
  };

  render() {
    return this.props.job.id ? (
      this.renderJob(this.props.job)
    ) : (
      <p>Description</p>
    );
  }
}
export default JobDetailsComponent;
