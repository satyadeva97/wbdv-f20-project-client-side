import React from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../../context";
import { postJob, updateJob } from "../../services/JobService";
import "./JobComponent.scss";

class JobsPostComponent extends React.Component {
  state = {
    title: this.props.job.title,
    description: this.props.job.description,
    location: this.props.job.location,
    type: this.props.job.type,

    submitted: false,
  };

  updateField = (event, key) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  postJob = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      submitted: true,
    });

    if (event.target.checkValidity()) {
      let body = { ...this.props.job, ...this.state };
      delete body.submitted;
      if (this.props.edit) {
        await updateJob(body);
        this.props.onEdit();
      } else {
        await postJob({
          ...body,
          recruiter: { id: this.context.user.id },
        });
      }
      this.props.history.push("/recruiter");
    }
  };

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">
          {this.props.edit ? "Edit Job" : "Post a new Job"}
        </h1>
        <hr className="my-4" />

        <form
          className={`needs-validation ${
            this.state.submitted ? "was-validated" : ""
          }`}
          onSubmit={this.postJob}
          noValidate
        >
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title
            </label>
            <div className="col-sm-6">
              <input
                className="form-control"
                id="title"
                value={this.state.title}
                onChange={this.updateField}
                pattern="^(.*(\S)+.*)$"
                required
              />
              <div className="invalid-feedback">Enter a valid character</div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="description" className="col-sm-2 col-form-label">
              Description
            </label>
            <div className="col-sm-6">
              <textarea
                rows="3"
                className="form-control"
                id="description"
                value={this.state.description}
                onChange={this.updateField}
                pattern="^(.*(\S)+.*)$"
                required
              />
              <div className="invalid-feedback">Enter a valid character</div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="location" className="col-sm-2 col-form-label">
              Location
            </label>
            <div className="col-sm-6">
              <input
                className="form-control"
                id="location"
                value={this.state.location}
                onChange={this.updateField}
                pattern="^(.*(\S)+.*)$"
                required
              />
              <div className="invalid-feedback">Enter a valid character</div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="type" className="col-sm-2 col-form-label">
              Type
            </label>
            <div className="col-sm-6">
              <input
                className="form-control"
                id="type"
                value={this.state.type}
                onChange={this.updateField}
                pattern="^(.*(\S)+.*)$"
                required
              />
              <div className="invalid-feedback">Enter a valid character</div>
            </div>
          </div>
          <div className="row">
            <button
              type="submit"
              className="btn btn-primary col-sm-1 offset-sm-9"
            >
              {this.props.edit ? "Update Job" : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

JobsPostComponent.defaultProps = {
  job: {
    title: "",
    description: "",
    location: "",
    type: "",
  },
  edit: false,
  onEdit: () => {},
};

JobsPostComponent.contextType = UserContext;

export default withRouter(JobsPostComponent);
