import React from "react";
import HeaderComponent from "../components/core/HeaderComponent";
import ProfileHome from "../components/homepage/ProfileHome";
import EditProfileComponent from "../components/user/EditProfileComponent";
import { UserContext } from "../context";
import {
  getAllFeaturedJobs,
  getAllJobs,
  getAppliedJobs,
  getFeaturedJobs,
} from "../services/JobService";
import "./ProfileContainer.scss";

class ProfileContainer extends React.Component {
  componentDidMount() {
    if (!this.props.editProfile) {
      this.getJobs({ keyword: "", location: "" });
    }
  }

  state = {
    jobs: [],
    featuredJobs: [],
    appliedJobs: [],
  };

  getJobs = async (search) => {
    const jobs = await getAllJobs(search.keyword, search.location);
    this.setState({ jobs: jobs });
    const featuredJobs = await (search.keyword || search.location
      ? getFeaturedJobs(search.keyword, search.location)
      : getAllFeaturedJobs());
    const appliedJobs = await getAppliedJobs(this.context.user.id);
    this.setState({ jobs: jobs, featuredJobs: featuredJobs, appliedJobs });
  };

  render() {
    return (
      <div className="container-fluid profile-container">
        <HeaderComponent />
        {this.props.editProfile ? (
          <EditProfileComponent />
        ) : (
          <ProfileHome
            jobs={this.state.jobs}
            featuredJobs={this.state.featuredJobs}
            appliedJobs={this.state.appliedJobs}
          />
        )}
      </div>
    );
  }
}

ProfileContainer.defaultProps = {
  editProfile: false,
};

ProfileContainer.contextType = UserContext;
export default ProfileContainer;
