import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import { setUserData } from "../../helpers/helper";
import { registerUser } from "../../services/UserService";

class SignUpComponent extends React.Component {
  state = {
    email: "",
    username: "",
    password: "",
    verifyPassword: "",
    type: "jobseeker",
    aboutMe: "",
    company: "",
    company_url: "",

    agree: false,

    submitted: false,
  };

  updateField = (event, state) => {
    this.setState({
      ...(state ? { ...state } : { [event.target.id]: event.target.value }),
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      submitted: true,
    });
    if (this.state.password !== this.state.verifyPassword) {
      document
        .getElementById("verifyPassword")
        .setCustomValidity("pwd Mismatch");
    } else if (event.target.checkValidity()) {
      let body = {
        ...this.state,
      };
      delete body.submitted;
      delete body.verifyPassword;
      delete body.agree;
      delete body.company;
      delete body.company_url;

      if (this.state.type === "recruiter") {
        body = {
          ...body,
          company: {
            name: this.state.company,
            url: this.state.company_url,
          },
        };
      }

      const user = await registerUser(body);
      if (user && user.id) {
        setUserData(user, this.context.updateUser);
        this.props.history.push(
          user.type === "jobseeker" ? "/profile" : "/recruiter"
        );
      }
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Sign Up</h1>
        {this.context.user.id ? (
          <div>
            <h5>
              Hello {this.context.user.username}, you have already registered
            </h5>
            <p>
              {"Click here to go to "}
              <Link to="/">Home</Link>
            </p>
          </div>
        ) : (
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
                  // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
                />
                <div className="invalid-feedback">Enter a valid Password</div>
              </div>
            </div>
            <div className="form-group row">
              <label
                className="col-sm-2 col-form-label"
                htmlFor="verifyPassword"
              >
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
              <label className="col-sm-2 col-form-label" htmlFor="aboutMe">
                About Me
              </label>
              <div className="col-sm-10">
                <textarea
                  rows="3"
                  onChange={this.updateField}
                  className="form-control wbdv-field"
                  id="aboutMe"
                  placeholder="Something to about you like: Iam a Lion Tamer working in Antarctica."
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">You are a</label>
              <div className="col-sm-10">
                <div className="form-check">
                  <input
                    onChange={(event) =>
                      this.updateField(event, { type: "jobseeker" })
                    }
                    className="form-check-input"
                    type="radio"
                    id="jobSeeker-radio"
                    value="jobseeker"
                    checked={this.state.type === "jobseeker"}
                  />
                  <label className="form-check-label" htmlFor="jobSeeker-radio">
                    Job Seeker
                  </label>
                </div>
                <div className="form-check">
                  <input
                    onChange={(event) =>
                      this.updateField(event, { type: "recruiter" })
                    }
                    className="form-check-input"
                    type="radio"
                    id="recruiter-radio"
                    value="recruiter"
                    checked={this.state.type === "recruiter"}
                  />
                  <label className="form-check-label" htmlFor="recruiter-radio">
                    Recruiter
                  </label>
                </div>
              </div>
            </div>

            {this.state.type === "recruiter" && (
              <>
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
                <div className="form-group row">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="company_url"
                  >
                    Company Url
                  </label>
                  <div className="col-sm-10">
                    <input
                      required
                      onChange={this.updateField}
                      className="form-control wbdv-field"
                      id="company_url"
                      placeholder="https://google.com"
                    />
                  </div>
                </div>
              </>
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
                  <a href="/privacy" target="_blank">
                    Agree to terms and conditions
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
                    <a
                      className="wbdv-link wbdv-link wbdv-login"
                      href="/signIn"
                    >
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
        )}{" "}
      </div>
    );
  }
}
SignUpComponent.contextType = UserContext;
export default SignUpComponent;
