import React from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../../context";
import { removeUserData, setUserData } from "../../helpers/helper";
import { getUser, updateUser } from "../../services/UserService";

class EditProfileComponent extends React.Component {
  state = {
    type: "jobseeker",
    email: "",
    username: "",
    phone: "",
    dob: "",

    company: "",
    company_url: "",

    submitted: false,

    apiUser: {},
  };

  async componentDidMount() {
    const user = await getUser(this.context.user.username);
    this.setState({
      type: user.type,
      email: user.email,
      username: user.username,
      phone: user.phone || "",
      dob: user.dob || "",

      company: user.company ? user.company.name : "",
      company_url: user.company ? user.company.url : "",
      apiUser: user,
    });
  }

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
      let body = {
        ...this.state.apiUser,
        ...this.state,
      };
      delete body.apiUser;
      delete body.submitted;
      delete body.company;
      delete body.company_url;

      if (this.state.type === "recruiter") {
        body = {
          ...body,
          company: {
            ...this.state.apiUser.company,
            name: this.state.company,
            url: this.state.company_url,
          },
        };
      }

      const user = await updateUser(body);
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
            <button
              className="btn btn-danger btn-block wbdv-button wbdv-logout"
              onClick={() => {
                removeUserData(this.context.updateUser);
                this.props.history.push("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

EditProfileComponent.contextType = UserContext;

export default withRouter(EditProfileComponent);
