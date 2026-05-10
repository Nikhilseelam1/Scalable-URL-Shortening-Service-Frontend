import api from "./axios.js";

export const shortenUrl = (data) =>
  api.post("/shorten", data);

export const getMyUrls = () =>
  api.get("/my-urls");

export const deleteUrl = (shortCode) =>
  api.delete(`/${shortCode}`);