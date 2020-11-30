const proxyUrl = "https://cors-anywhere.herokuapp.com/";
export const getAllJobs = (input) => {

    return fetch(`${proxyUrl}https://jobs.github.com/positions.json?page=1&search=${input}`)
        .then(function (response) {
        return response.json();
    });
};

export const getJobsByLocation = (loc) => {
    return fetch(`${proxyUrl}https://jobs.github.com/positions.json?location=${loc}`)
        .then(function (response) {
            return response.json();
        });
};