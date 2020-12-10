import React from "react";
import { Link } from "react-router-dom";
import { getUserData, removeUserData, setUserData } from "../../helpers/helper";
// import "./SignInComponent.scss"

class SignInComponent extends React.Component {
  state = {
    email: "",
    password: "",

    submitted: false,

    userData: getUserData(),
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

    if (event.target.checkValidity()) {
      // api
      setUserData({ username: "TZ", id: "2", role: "jobseeker" });
      this.props.history.push("/profile");
    }
  };
  render() {
    return (
      <div className="container">
        <h1>Sign In</h1>
        {this.state.userData.id ? (
          <div>
            <h5>
              Hello {this.state.userData.username}, you need to logout to Signin
              again
            </h5>
            <p>
              Click here to
              <button
                className="btn btn-link"
                onClick={() => {
                  removeUserData();
                  this.setState({ userData: getUserData() });
                }}
              >
                logout
              </button>
            </p>
          </div>
        ) : (
          <form
            className={`needs-validation ${
              this.state.submitted ? "was-validated" : ""
            }`}
            name="signInForm"
            id="signInForm"
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
              <label className="col-sm-2 col-form-label" htmlFor="password">
                Password
              </label>
              <div className="col-sm-10">
                <input
                  required
                  onChange={this.updateField}
                  className="form-control wbdv-field wbdv-password"
                  id="password"
                  placeholder="123QWe#$%"
                  type="password"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
                />
                <div className="invalid-feedback">Enter a valid password</div>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-10 offset-sm-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-block wbdv-button wbdv-register"
                >
                  Sign In
                </button>
                <div className="row">
                  <div className="col">
                    <a
                      className="wbdv-link wbdv-link wbdv-login"
                      href="/signUp"
                    >
                      Sign Up
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
        )}
      </div>
    );
  }
}

export default SignInComponent;
