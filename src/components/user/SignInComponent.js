import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import { removeUserData, setUserData } from "../../helpers/helper";
import { loginUser } from "../../services/UserService";

class SignInComponent extends React.Component {
  state = {
    username: "",
    password: "",

    submitted: false,
  };

  updateField = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      submitted: true,
    });

    if (event.target.checkValidity()) {
      const user = await loginUser({
        username: this.state.username,
        password: this.state.password,
      });
      if (user && user.id) {
        setUserData(user, this.context.updateUser);
        if (
          this.props.history.location.state &&
          this.props.history.location.state.from
        ) {
          this.props.history.push(this.props.history.location.state.from);
        } else {
          this.props.history.push(
            user.type === "jobseeker" ? "/profile" : "/recruiter"
          );
        }
      }
    }
  };
  render() {
    return (
      <div className="container">
        <h1>Sign In</h1>
        {this.props.history.location.state &&
          this.props.history.location.state.message && (
            <h3>{this.props.history.location.state.message}</h3>
          )}
        {this.context.user.id ? (
          <div>
            <h5>
              Hello {this.context.user.username}, you need to logout to Sign-In
              again
            </h5>
            <p>
              Click here to
              <button
                className="btn btn-link"
                onClick={() => {
                  removeUserData(this.context.updateUser);
                }}
              >
                logout
              </button>
              or go to <Link to="/">Home</Link>
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
              <label className="col-sm-2 col-form-label" htmlFor="username">
                Username
              </label>
              <div className="col-sm-10">
                <input
                  required
                  onChange={this.updateField}
                  className="form-control wbdv-field wbdv-username"
                  id="username"
                  placeholder="Homosapien"
                  type="text"
                  // pattern="^(\w|\d)+.*$"
                  minLength={3}
                  maxLength={25}
                />
                <div className="invalid-feedback">
                  Username should start with a number/letter with length between
                  3 , 25
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
                  onChange={this.updateField}
                  className="form-control wbdv-field wbdv-password"
                  id="password"
                  placeholder="123QWe#$%"
                  type="password"
                  // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
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

SignInComponent.contextType = UserContext;

export default SignInComponent;
