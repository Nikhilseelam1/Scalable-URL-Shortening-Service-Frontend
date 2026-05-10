import api from "./axios.js";

export const getAnalytics = (shortCode) =>
  api.get(`/analytics/${shortCode}`);

export const getAnalyticsByRange = (shortCode, startDate, endDate) =>
  api.get(`/analytics/${shortCode}/range`, { params: { startDate, endDate } });