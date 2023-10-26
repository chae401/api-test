import axios from "axios";

// const api = axios.create({
//   baseURL: "http://118.67.134.151/hackathon/api",
// });

export const auth = (data) => axios.post("/hackathon/api/auth", data);

export const save = (data, token) =>
  axios.post("/hackathon/api/save", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
