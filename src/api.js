import axios from "axios";

const api = axios.create({
  baseURL: "http://kafka.suitestudy.com:8000",
});

export const auth = (data) => api.post("/auth", data);

export const save = (data, token) =>
  api.post("/save", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
