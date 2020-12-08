import { trackPromise } from "react-promise-tracker";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

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

export const postJob = (job) => {
  return true;
};
