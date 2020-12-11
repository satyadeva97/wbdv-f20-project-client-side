import { trackPromise } from "react-promise-tracker";
import { apiUrl, proxyUrl } from "./constants";
import { formatJobFromAPI, formatJobToAPI } from "../helpers/helper";

export const getAllJobs = (keyword, location) => {
  return trackPromise(
    fetch(
      `${proxyUrl}https://jobs.github.com/positions.json?page=1&description=${keyword}&location=${location}`
    ).then(function (response) {
      return response.json();
    })
  );
};

export const getJobsByLocation = (loc) => {
  return trackPromise(
    fetch(
      `${proxyUrl}https://jobs.github.com/positions.json?location=${loc}`
    ).then(function (response) {
      return response.json();
    })
  );
};

export const getJobDetailsById = (id) => {
  return trackPromise(
    fetch(`${proxyUrl}https://jobs.github.com/positions/${id}.json`).then(
      (response) => {
        return response.json();
      }
    )
  );
};

export const getAllFeaturedJobs = () => {
  return trackPromise(
    fetch(`${apiUrl}jobs`).then((response) => {
      return response
        .json()
        .then((jobs) => jobs.map((x) => formatJobFromAPI(x)));
    })
  );
};

export const getFeaturedJobs = (keyword, location) => {
  return trackPromise(
    fetch(`${apiUrl}jobs/keyword/${keyword}/location/${location}`).then(
      (response) => {
        return response
          .json()
          .then((jobs) => jobs.map((x) => formatJobFromAPI(x)));
      }
    )
  );
};

export const getAppliedJobs = (id) => {
  return trackPromise(
    fetch(`${apiUrl}jobseekers/${id}/appliedJobs`).then((response) => {
      return response
        .json()
        .then((jobs) =>
          jobs.map((x) => formatJobFromAPI(x, { applied: true }))
        );
    })
  );
};

export const getPostedJobs = (id) => {
  return trackPromise(
    // fetch(`${apiUrl}recruiters/${id}/postedJobs`).then((response) => {
    fetch(`${apiUrl}jobs`).then((response) => {
      return response
        .json()
        .then((jobs) => jobs.map((x) => formatJobFromAPI(x, { posted: true })));
    })
  );
};
export const getApplicants = (id) => {
  return trackPromise(
    fetch(`${apiUrl}jobs/${id}/applicants`).then((response) => {
      return response.json();
    })
  );
};

export const getFeaturedJobDetails = (id) => {
  return trackPromise(
    fetch(`${apiUrl}/jobs/${id}`).then((response) => {
      return response.json().then((job) => formatJobFromAPI(job));
    })
  );
};

export const applyJob = (job, id) => {
  return trackPromise(
    fetch(`${apiUrl}jobs/apply/${id}`, {
      method: "POST",
      body: JSON.stringify(formatJobToAPI(job)),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      return response.json().then((job) => formatJobFromAPI(job));
    })
  );
};

export const postJob = (job) => {
  return true;
};
