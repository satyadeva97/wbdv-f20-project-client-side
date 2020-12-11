import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./JobComponent.scss";
class JobsCardComponent extends React.Component {
  getHref = (job) => {
    let url = this.props.job.id;
    if (job.applied) {
      url = `applied/${this.props.job.jobId}`;
    } else if (job.posted) {
      url = `posted/${this.props.job.jobId}`;
    } else if (job.jobId) {
      url = `featured/${this.props.job.jobId}`;
    }
    return `job/${url}`;
  };

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
          <a href={this.getHref(this.props.job)}>
            <div className="job-designation">{this.props.job.title}</div>
          </a>
          <a href={this.props.job.company_url} target="_blank" rel="noreferrer">
            <div className="company-name">{this.props.job.company}</div>
          </a>
          <div className="company-location">
            <FontAwesomeIcon icon={faGlobeAmericas} /> {this.props.job.location}
          </div>
        </div>
      </li>
    );
  }
}
export default JobsCardComponent;
