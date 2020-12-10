import { trackPromise } from "react-promise-tracker";
import { apiUrl } from "./constants";

export const registerUser = (body) => {
  return trackPromise(
    fetch(`${apiUrl}register`, {
      method: "POST",
      body: JSON.stringify({ ...body, id: -1 }),
    }).then((response) => {
      return response.json();
    })
  );
};
