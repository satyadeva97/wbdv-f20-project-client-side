import React from "react";
import { Link } from "react-router-dom";
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
            {job.postedBy && (
              <p>
                Posted By <Link>{job.postedBy.name}</Link>
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
            ) : job.applied ? (
              <button className="btn btn-danger">Apply</button>
            ) : (
              <button className="btn btn-success">Applied</button>
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
      this.renderJob({
        ...this.props.job,
        postedBy: { id: 1, name: "MUSK" },
        applicants: [
          {
            name: "Steve Jobs",
            id: "3",
            appliedOn: "29-02-2020",
          },
          {
            name: "Steve Jobs",
            id: "3",
            appliedOn: "29-02-2020",
          },
          {
            name: "Steve Jobs",
            id: "3",
            appliedOn: "29-02-2020",
          },
          {
            name: "Steve Jobs",
            id: "3",
            appliedOn: "29-02-2020",
          },
        ],
      })
    ) : (
      <p>Description</p>
    );
  }
}
export default JobDetailsComponent;
