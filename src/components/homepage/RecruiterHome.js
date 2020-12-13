import React from "react";
import { Link, withRouter } from "react-router-dom";
import { deleteJob, getApplicants } from "../../services/JobService";
import JobDetailsComponent from "../job/JobDetailsComponent";
import JobPostComponent from "../job/JobPostComponent";
import JobsCardComponent from "../job/JobsCardComponent";
import "./home.scss";

class RecruiterHome extends React.Component {
  state = {
    editJob: null,
    deleteJob: null,
  };

  editJob = (job) => {
    this.setState({ editJob: job });
  };
  deleteJob = async (job) => {
    const applicants = this.props.postedJobId
      ? []
      : await getApplicants(job.jobId);
    this.setState({ deleteJob: { ...job, posted: true, applicants } });
  };

  deleteJobFromAPI = async () => {
    await deleteJob(this.state.deleteJob.jobId);

    this.props.getAllJobs();
    this.setState({ deleteJob: null });
  };

  renderBasedOnProps = () => {
    return this.props.postedJobId ? (
      <>
        <JobDetailsComponent
          jobId={this.props.postedJobId}
          job={this.props.postedJob}
          history={this.props.history}
          editJob={this.editJob}
          deleteJob={this.deleteJob}
        />
      </>
    ) : (
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
              return (
                <JobsCardComponent
                  key={job.id}
                  job={job}
                  editJob={this.editJob}
                  deleteJob={this.deleteJob}
                />
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.state.editJob ? (
          <>
            <JobPostComponent
              job={this.state.editJob}
              edit
              onEdit={() => {
                this.props.getAllJobs();
                this.editJob(null);
              }}
            />
          </>
        ) : (
          <>
            {this.state.deleteJob && (
              <>
                <div
                  className="modal fade show "
                  id="deleteModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  style={{ display: "block", backgroundColor: "#0f0a0aad" }}
                >
                  <div className="modal-dialog modal-xl modal-xxl">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Are you sure you want to delete this Job
                        </h5>
                        <button
                          type="button"
                          className="close"
                          onClick={() => {
                            this.setState({ deleteJob: null });
                          }}
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      {!this.props.postedJobId && (
                        <div className="modal-body">
                          <JobDetailsComponent
                            job={{ ...this.state.deleteJob, posted: false }}
                          />
                        </div>
                      )}
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            this.setState({ deleteJob: null });
                          }}
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={this.deleteJobFromAPI}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {this.renderBasedOnProps()}
          </>
        )}
      </div>
    );
  }
}

RecruiterHome.defaultProps = {
  jobs: [],
  postedJob: {},
  postedJobId: "",
};
export default withRouter(RecruiterHome);
