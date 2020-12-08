import React from "react";

class SignUpComponent extends React.Component {
  state = {
    email: "",
    userName: "",
    password: "",
    verifyPassword: "",
    role: 0,
    company: "",

    agree: false,

    submitted: false,
  };

  updateField = (event, state) => {
    this.setState({
      ...(state ? { ...state } : { [event.target.id]: event.target.value }),
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      submitted: true,
    });
    if (this.state.password !== this.state.verifyPassword) {
      document
        .getElementById("verifyPassword")
        .setCustomValidity("pwd Mismatch");
    } else {
      // api
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Sign Up</h1>
        <form
          className={`needs-validation ${
            this.state.submitted ? "was-validated" : ""
          }`}
          name="signUpForm"
          id="signUpForm"
          noValidate
          onSubmit={this.onSubmit}
        >
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="email">
              Email
            </label>
            <div className="col-sm-10">
              <input
                required
                onChange={this.updateField}
                className="form-control wbdv-field wbdv-password-verify"
                id="email"
                placeholder="user@email.com"
                type="email"
              />
              <div className="invalid-feedback">Enter a Valid Email</div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="userName">
              Username
            </label>
            <div className="col-sm-10">
              <input
                required
                onChange={this.updateField}
                className="form-control wbdv-field wbdv-username"
                id="userName"
                placeholder="Homosapien"
                type="text"
                pattern="^(\w|\d)+.*$"
                minLength={3}
                maxLength={25}
              />
              <div className="invalid-feedback">
                Username should start with a number/letter with length between 3
                , 25
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="password">
              Password
            </label>
            <div className="col-sm-10">
              <input
                required
                onChange={(event) => {
                  this.updateField(event);
                  document
                    .getElementById("verifyPassword")
                    .setCustomValidity(
                      this.state.verifyPassword !== event.target.value
                        ? "Pwd Mismatch"
                        : ""
                    );
                }}
                className="form-control wbdv-field wbdv-password"
                id="password"
                placeholder="123QWe#$%"
                type="password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
              />
              <div className="invalid-feedback">
                Passwords should contain Minimum 8 and maximum 16 characters, at
                least one uppercase letter, one lowercase letter, one number and
                one special character
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="verifyPassword">
              Verify Password
            </label>
            <div className="col-sm-10">
              <input
                onChange={(event) => {
                  this.updateField(event);
                  event.target.setCustomValidity(
                    this.state.password !== event.target.value
                      ? "Pwd Mismatch"
                      : ""
                  );
                }}
                className="form-control wbdv-field wbdv-password-verify"
                id="verifyPassword"
                placeholder="123QWe#$%"
                type="password"
              />
              <div className="invalid-feedback">
                Entered passwords do not Match
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">You are a</label>
            <div className="col-sm-10">
              <div className="form-check">
                <input
                  onChange={(event) => this.updateField(event, { role: 0 })}
                  className="form-check-input"
                  type="radio"
                  id="jobSeeker-radio"
                  value="0"
                  checked={this.state.role === 0}
                />
                <label className="form-check-label" htmlFor="jobSeeker-radio">
                  Job Seeker
                </label>
              </div>
              <div className="form-check">
                <input
                  onChange={(event) => this.updateField(event, { role: 1 })}
                  className="form-check-input"
                  type="radio"
                  id="recruiter-radio"
                  value="1"
                  checked={this.state.role === 1}
                />
                <label className="form-check-label" htmlFor="recruiter-radio">
                  Recruiter
                </label>
              </div>
            </div>
          </div>

          {this.state.role === 1 && (
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="company">
                Company
              </label>
              <div className="col-sm-10">
                <input
                  required
                  onChange={this.updateField}
                  className="form-control wbdv-field"
                  id="company"
                  placeholder="JobMan Ltd"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <div className="form-check">
              <input
                required
                onChange={this.updateField}
                className="form-check-input"
                type="checkbox"
                value=""
                id="agree"
              />
              <label className="form-check-label" htmlFor="agree">
                Agree to{" "}
                <a href="/privacy" target="_blank">
                  terms and conditions
                </a>
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10 offset-sm-2">
              <button
                type="submit"
                className="btn btn-primary btn-block wbdv-button wbdv-register"
              >
                Sign up
              </button>
              <div className="row">
                <div className="col">
                  <a className="wbdv-link wbdv-link wbdv-login" href="/signIn">
                    Login
                  </a>
                </div>
                <div className="col">
                  <a className="float-right" href="/">
                    Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpComponent;
