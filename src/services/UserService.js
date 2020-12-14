import { trackPromise } from "react-promise-tracker";
import { apiUrl } from "./constants";

export const registerUser = (body) => {
  let url = apiUrl;
  if (body.type === "jobseeker") {
    url += "register/jobseeker";
  } else {
    url += "register/recruiter";
  }
  return trackPromise(
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ ...body }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      return response.json();
    })
  );
};

export const loginUser = (body) => {
  return trackPromise(
    fetch(`${apiUrl}login`, {
      method: "POST",
      body: JSON.stringify({ ...body }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
        if (response.status == 200) {
            return response.json();
        } else {
            return {};
        }

    })
  );
};

export const updateUser = (body) => {
  let url = apiUrl;
  if (body.type === "jobseeker") {
    url += "jobseekers";
  } else {
    url += "recruiters";
  }
  return trackPromise(
    fetch(`${url}/${body.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...body }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      return response.json();
    })
  );
};

export const getUser = (id, type) => {
  let url = apiUrl;
  if (type === "jobseeker") {
    url += "jobseekers";
  } else {
    url += "recruiters";
  }

  return trackPromise(
    fetch(`${url}/${id}`)
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        console.log(e);
        return null;
      })
  );
};

export const searchUser = (username) => {
  return trackPromise(
    fetch(`${apiUrl}users/${username}`)
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        console.log(e);
        return [];
      })
  );
};
