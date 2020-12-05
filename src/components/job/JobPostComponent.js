import React from "react";
import { postJob } from "../../services/JobService";
import "./JobComponent.scss";

class JobsPostComponent extends React.Component {
  state = {
    title: "",
    description: "",
    location: "",
    type: "",
  };

  updateField = (event, key) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  postJob = () => {
    postJob({ ...this.state });
  };

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Post a new Job</h1>
        <hr className="my-4" />

        <form onSubmit={this.postJob}>
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
              />
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
              />
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
              />
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
              />
            </div>
          </div>
          <div className="row">
            <button
              type="submit"
              className="btn btn-primary col-sm-1 offset-sm-9"
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default JobsPostComponent;
