import React from "react";
import HeaderComponent from "../components/core/HeaderComponent";
import ProfileHome from "../components/homepage/ProfileHome";
import JobsCardComponent from "../components/job/JobsCardComponent";
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
  updateCallback() {
    if (!this.props.editProfile) {
      if (this.props.showAppliedJobsOnly) {
        this.getAppliedJobsOnly();
      } else {
        this.getJobs({ keyword: "", location: "" });
      }
    }
  }

  componentDidMount() {
    this.updateCallback();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.editProfile !== this.props.editProfile) {
      this.updateCallback();
    }
  }

  state = {
    jobs: [],
    featuredJobs: [],
    appliedJobs: [],
  };

  getJobs = async (search) => {
    await Promise.all([
      getAllJobs(search.keyword, search.location).catch((e) => {
        console.log(e);
        return [];
      }),
      (search.keyword || search.location
        ? getFeaturedJobs(search.keyword, search.location)
        : getAllFeaturedJobs()
      ).catch((e) => {
        console.log(e);
        return [];
      }),
      getAppliedJobs(this.context.user.id).catch((e) => {
        console.log(e);
        return [];
      }),
    ]).then((results) => {
      this.setState({
        jobs: results[0],
        featuredJobs: results[1],
        appliedJobs: results[2],
      });
    });
  };

  getAppliedJobsOnly = async () => {
    const appliedJobs = await getAppliedJobs(this.context.user.id);
    this.setState({ appliedJobs });
  };

  render() {
    return (
      <div className="container-fluid profile-container">
        <HeaderComponent />
        {this.props.editProfile ? (
          <EditProfileComponent />
        ) : this.props.showAppliedJobsOnly ? (
          <>
            <h1>Applied Jobs:</h1>
            {this.state.appliedJobs.length === 0 && <h5>No jobs applied</h5>}

            {this.state.appliedJobs && (
              <ul className="row flex-container wrap no-gutters">
                {this.state.appliedJobs.map((job) => {
                  return <JobsCardComponent key={job.id} job={job} />;
                })}
              </ul>
            )}
          </>
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
  showAppliedJobsOnly: false,
};

ProfileContainer.contextType = UserContext;
export default ProfileContainer;
