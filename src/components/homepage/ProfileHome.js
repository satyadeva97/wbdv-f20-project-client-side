import React from "react";
import JobCarouselComponent from "../job/JobCarousel";
import "./home.scss";

class ProfileHome extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h5>Applied Jobs ({this.props.jobs.length}):</h5>
          {this.props.jobs.length && (
            <ul className="border-li">
              <JobCarouselComponent slides={this.props.jobs} />
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
          <h5>Featured Jobs:</h5>
          {this.props.jobs.length && (
            <ul className="border-li">
              <JobCarouselComponent slides={this.props.jobs} />
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
