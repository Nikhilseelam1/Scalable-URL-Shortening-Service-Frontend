import api from "./axios.js";

export const shortenUrl = (data) =>
  api.post("/urls/shorten", data);

export const getMyUrls = () =>
  api.get("/urls/my-urls");

export const deleteUrl = (shortCode) =>
  api.delete(`/urls/${shortCode}`);