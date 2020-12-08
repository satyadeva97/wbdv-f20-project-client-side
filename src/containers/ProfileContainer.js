import React from "react";
import HeaderComponent from "../components/core/HeaderComponent";
import ProfileHome from "../components/homepage/ProfileHome";
import EditProfileComponent from "../components/user/EditProfileComponent";
import { getAllJobs } from "../services/JobService";
import "./ProfileContainer.scss";

class ProfileContainer extends React.Component {
  componentDidMount() {
    if (!this.props.editProfile) {
      this.getJobs({ keyword: "", location: "" });
    }
  }

  state = {
    jobs: [],
  };

  getJobs = async (search) => {
    const jobs = await getAllJobs(search.keyword, search.location);
    this.setState({ jobs: jobs });
  };

  render() {
    return (
      <div className="container-fluid profile-container">
        <HeaderComponent />
        {this.props.editProfile ? (
          <EditProfileComponent />
        ) : (
          <ProfileHome jobs={this.state.jobs} />
        )}
      </div>
    );
  }
}

ProfileContainer.defaultProps = {
  editProfile: false,
};
export default ProfileContainer;
