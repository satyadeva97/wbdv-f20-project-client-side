import React from "react";
import "./JobComponent.scss";
class JobsCardComponent extends React.Component {
  render() {
    return (
      <li className="flex-item p-0 b-0">
        <div className="flex-col-container">
          <div className="company-logo d-flex justify-content-center">
            <img
              src={this.props.job.company_logo || "/altImage.png"}
              alt={this.props.job.company}
            />
          </div>
          <a href={`/job/${this.props.job.id}`}>
            <div className="job-designation">{this.props.job.title}</div>
          </a>
          <a href={this.props.job.company_url} target="_blank" rel="noreferrer">
            <div className="company-name">{this.props.job.company}</div>
          </a>
        </div>
      </li>
    );
  }
}
export default JobsCardComponent;
