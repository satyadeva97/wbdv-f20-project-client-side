import React from "react";
import { Link } from "react-router-dom";
import JobCarouselComponent from "../job/JobCarousel";
import "./home.scss";

class ProfileHome extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h5>
            Applied Jobs
          </h5>
            <p>
              <h6>Number of jobs: {this.props.appliedJobs.length}</h6> Click
                <Link to="/appliedJobs"> here </Link>
                to view
            all applied jobs
            </p>
          {this.props.appliedJobs.length && (
            <ul className="border-li">
              <JobCarouselComponent
                slides={this.props.appliedJobs}
                autoPlay={false}
              />
            </ul>
          )}
        </div>
        <div>
          <h5>Trending Jobs:</h5>
          {this.props.jobs.length && (
            <ul className="border-li">
              <JobCarouselComponent slides={this.props.jobs} />
            </ul>
          )}
        </div>
        <div>
          <h5>Recent Jobs:</h5>
          {this.props.featuredJobs.length && (
            <ul className="border-li">
              <JobCarouselComponent
                slides={this.props.featuredJobs}
                autoPlay={false}
              />
            </ul>
          )}
        </div>
      </div>
    );
  }
}
ProfileHome.defaultProps = {
  jobs: [],
};
export default ProfileHome;
