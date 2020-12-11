import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import { applyJob } from "../../services/JobService";
import "./JobComponent.scss";

class JobDetailsComponent extends React.Component {
  state = {
    showDescription: true,
  };
  toggleDescription = () => {
    this.setState({ showDescription: !this.state.showDescription });
  };

  renderJob = (job) => {
    return (
      <div className="card job-description">
        <div className="row card-header job-header align-items-center">
          <div className="col">
            <img src={job.company_logo || "/altImage.png"} alt={job.company} />

            <h5>
              <a href={job.company_url} target="_blank" rel="noreferrer">
                {job.company}
              </a>
              ({job.type})
            </h5>
            {job.recruiter && (
              <p>
                Posted By <Link>{job.recruiter.username}</Link>
              </p>
            )}
          </div>
          <div className="col col-sm-1">
            {job.applicants ? (
              this.state.showDescription ? (
                <button
                  className="btn btn-secondary"
                  onClick={this.toggleDescription}
                >
                  Show Applicants
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={this.toggleDescription}
                >
                  Show Description
                </button>
              )
            ) : job.applied && this.context.user.id ? (
              <button className="btn btn-success">Applied</button>
            ) : (
              <button
                className="btn btn-danger"
                onClick={async () => {
                  if (this.context.user.id) {
                    await applyJob(job, this.context.user.id);
                  } else {
                    this.props.history.push("/signIn", {
                      message: "Please Login to apply ",
                      from: this.props.history.location.pathname,
                    });
                  }
                }}
              >
                Apply
              </button>
            )}
          </div>
        </div>
        <div className="card-body">
          <h5>
            {this.state.showDescription
              ? "Description"
              : `Applicants (${job.applicants.length})`}
          </h5>
          {this.state.showDescription ? (
            <p dangerouslySetInnerHTML={{ __html: job.description }}></p>
          ) : (
            <>
              <ul class="list-group">
                {job.applicants.map((a) => {
                  return (
                    <div className="list-group-item list-group-item-action ">
                      <div className="d-flex w-100 justify-content-between">
                        <Link className="mb-1">{a.name}</Link>
                        <small>{a.appliedOn}</small>
                      </div>
                    </div>
                  );
                })}
              </ul>
            </>
          )}
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

JobDetailsComponent.contextType = UserContext;

export default JobDetailsComponent;
