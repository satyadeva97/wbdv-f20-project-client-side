import React from "react";

class EditProfileComponent extends React.Component {
  state = {
    type: "Job Seeker",
    email: "email@email.com",
    username: "Robot",
    phone: "(123) 156-234",
    dob: "1998-01-23",

    submitted: false,
  };

  updateField = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      submitted: true,
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Profile</h1>
        <form
          className={`needs-validation ${
            this.state.submitted ? "was-validated" : ""
          }`}
          noValidate
          onSubmit={this.onSubmit}
        >
          <div className="form-group row">
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="type">
                Type
              </label>
              <div className="col-sm-10">
                <input
                  required
                  value={this.state.type}
                  className="form-control wbdv-field "
                  id="type"
                  placeholder="Job Seeker"
                  readOnly
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="email">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  required
                  value={this.state.email}
                  className="form-control wbdv-field wbdv-email"
                  id="email"
                  placeholder="alice@wonderland.com"
                  type="email"
                  readOnly
                />
              </div>
            </div>
            <label className="col-sm-2 col-form-label" htmlFor="username">
              Username
            </label>
            <div className="col-sm-10">
              <input
                required
                onChange={this.updateField}
                value={this.state.username}
                className="form-control wbdv-field wbdv-username"
                id="username"
                placeholder="Homosapien"
                type="text"
                pattern="^(\w|\d)+.*$"
                minLength={3}
                maxLength={25}
              />
              <div className="invalid-feedback">
                Username should start with a number/letter with length between
                3, 25
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="phone">
              Phone
            </label>
            <div className="col-sm-10">
              <input
                onChange={this.updateField}
                value={this.state.phone}
                className="form-control wbdv-field wbdv-phone"
                id="phone"
                placeholder="(555) 123-4324"
                type="tel"
              />
              <div className="invalid-feedback">Enter a Valid phone number</div>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="dob">
              Date of Birth
            </label>
            <div className="col-sm-10">
              <input
                onChange={this.updateField}
                value={this.state.dob}
                className="form-control wbdv-field wbdv-dob"
                id="dob"
                type="date"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10 offset-sm-2">
              <button
                type="submit"
                className="btn btn-success btn-block wbdv-button wbdv-button wbdv-update"
              >
                Update
              </button>
            </div>
          </div>
        </form>
        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
            <button className="btn btn-danger btn-block wbdv-button wbdv-logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfileComponent;
