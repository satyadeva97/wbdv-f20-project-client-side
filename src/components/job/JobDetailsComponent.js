import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import { applyJob } from "../../services/JobService";
import "./JobComponent.scss";

class JobDetailsComponent extends React.Component {
  state = {
    showDescription: true,
    applied: this.props.job.applied,
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
                Posted By{" "}
                <Link
                  to={{
                    pathname: `/profile/${job.recruiter.id}`,
                    state: { type: "recruiter" },
                  }}
                >
                  {job.recruiter.username}
                </Link>
              </p>
            )}
          </div>
          <div className="col col-sm-2">
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
            ) : (job.applied || this.state.applied) && this.context.user.id ? (
              <button className="btn btn-success">Applied</button>
            ) : (
              this.context.user.type !== "recruiter" && (
                <button
                  className="btn btn-danger"
                  onClick={async () => {
                    if (this.context.user.id) {
                      const response = await applyJob(
                        job,
                        this.context.user.id
                      );
                      if (response) {
                        this.setState({ applied: true });
                      }
                    } else {
                      this.props.history.push("/login", {
                        message: "Please Login to apply ",
                        from: this.props.history.location.pathname,
                      });
                    }
                  }}
                >
                  Apply
                </button>
              )
            )}
          </div>
          {job.applicants && !job.hideEdit && (
            <div className="col col-sm-1 d-flex flex-column justify-content-center align-items-between">
              <button
                onClick={() => {
                  this.props.editJob(this.props.job);
                }}
                type="button"
                className="btn btn-primary"
              >
                {" Edit "}
              </button>
              <button
                onClick={() => {
                  this.props.deleteJob(this.props.job);
                }}
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="card-body">
          <h5>
            {this.state.showDescription
              ? "Description"
              : `Number of Applicants: ${job.applicants.length}`}
          </h5>
          {this.state.showDescription ? (
            <p dangerouslySetInnerHTML={{ __html: job.description }}></p>
          ) : (
            <>
              <ul className="list-group">
                {job.applicants.map((a) => {
                  return (
                    <div
                      key={a.id}
                      className="list-group-item list-group-item-action "
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <Link
                          className="mb-1"
                          to={{
                            pathname: `/profile/${a.id}`,
                            state: { type: "jobseeker" },
                          }}
                        >
                          {a.username}
                        </Link>
                        <small>
                          <a href={`mailto:${a.email}`}>{a.email}</a>
                        </small>
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
