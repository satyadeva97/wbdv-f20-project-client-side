import React from "react";
import "./JobComponent.scss";
import JobsCardComponent from "./JobsCardComponent";
import JobSearchComponent from "./JobSearchComponent";
class JobsComponent extends React.Component {
  onJobSearch = ({ keyword = "", location = "" }) => {
    this.props.history.push(
      `/search/keyword/${keyword ? keyword : "%20"}/location/${
        location ? location : "%20"
      }/`
    );
  };

  render() {
    return (
      <div>
        <JobSearchComponent onSearch={this.onJobSearch} />
        <div className="text-center">
          {(this.props.search.keyword || this.props.search.keyword) &&
            `Showing results for Keyword:${this.props.search.keyword} Location:${this.props.search.location}`}
        </div>
        {this.props.jobs.length === 0 && <h5>No jobs to show</h5>}

        {this.props.jobs && (
          <ul className="row flex-container wrap no-gutters">
            {this.props.jobs.map((job) => {
              return <JobsCardComponent key={job.id} job={job} />;
            })}
          </ul>
        )}
        <div className="container">
          {this.props.featuredJobs.length > 0 && (
            <>
              <h5>Recent Jobs</h5>
              <ul className="row flex-container wrap no-gutters">
                {this.props.featuredJobs.map((job) => {
                  return <JobsCardComponent key={job.id} job={job} />;
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    );
  }
}

JobsComponent.defaultProps = {
  jobs: [],
  featuredJobs: [],
};

export default JobsComponent;
