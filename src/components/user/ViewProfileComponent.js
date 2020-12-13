import React from "react";
import HeaderComponent from "../core/HeaderComponent";
import { getUser } from "../../services/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context";

class ViewProfileComponent extends React.Component {
  async getUserData() {
    if (this.props.userId) {
      const profile = await getUser(this.props.userId, this.props.type);
      this.setState({ profile });
    }
  }
  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userId !== this.props.userId) {
      this.getUserData();
    }
  }

  state = {
    profile: null,
  };

  render() {
    return (
      <div className="container-fluid">
        <HeaderComponent />
        <h1>Profile</h1>
        {this.state.profile && (
          <div className="card">
            <div className="card-header">
              <h1>
                <b>{this.state.profile.username}</b>
              </h1>
            </div>
            <div className="card-body">
              {this.context.user.username ? (
                <>
                  <h5 className="card-title">Contact Info</h5>
                  {this.state.profile.phone && (
                    <p className="card-text">
                      <FontAwesomeIcon icon={faPhone} />{" "}
                      {this.state.profile.phone}
                    </p>
                  )}
                  <a
                    className="card-text"
                    href={`mailto:${this.state.profile.email}`}
                  >
                    <span className="mr-1">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    {this.state.profile.email}
                  </a>
                </>
              ) : (
                <h3>
                  You need to <a href="/signIn">login</a> to view contact
                  details
                </h3>
              )}
              {this.state.profile.company && (
                <>
                  <h5 className="card-title">Company </h5>
                  <p className="card-text">
                    <a
                      href={this.state.profile.company.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="mr-1">
                        <FontAwesomeIcon icon={faBuilding} />
                      </span>
                      {this.state.profile.company.name}
                    </a>
                  </p>
                </>
              )}
              <h5 className="card-title">About</h5>
              <p className="card-text">{this.state.profile.aboutMe}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ViewProfileComponent.defaultProps = {
  userId: "",
  type: "jobseeker",
};

ViewProfileComponent.contextType = UserContext;

export default ViewProfileComponent;
