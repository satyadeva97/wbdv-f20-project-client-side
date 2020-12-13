import { trackPromise } from "react-promise-tracker";
import { apiUrl } from "./constants";

export const registerUser = (body) => {
  return trackPromise(
    fetch(`${apiUrl}register`, {
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
      return response.json();
    })
  );
};

export const updateUser = (body) => {
  return trackPromise(
    fetch(`${apiUrl}profile/${body.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...body }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      return response.json();
    })
  );
};

export const getUser = (username) => {
  return trackPromise(
    fetch(`${apiUrl}profile/${username}`)
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
    fetch(`${apiUrl}profile/${username}`)
      .then((response) => {
        return [
          { username: "qwetrty5", id: 1 },
          { username: "qwetrt5", id: 11 },
          { username: "qwetrty5", id: 111 },
          { username: "qwetrt5", id: 11111 },
        ];
      })
      .catch((e) => {
        console.log(e);
        return [];
      })
  );
};
