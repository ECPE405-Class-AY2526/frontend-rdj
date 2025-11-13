// Centralized API base URL for web client
// - Split (Static Site + API): set VITE_API_BASE_URL to your API origin
// - Single service (Express serves client): leave unset to use relative paths
// - Local dev (Vite on :5173 + API on :5001): defaults to http://localhost:5001
const devDefault =
  typeof window !== "undefined" && window.location.port === "5173"
    ? "http://localhost:5001"
    : "";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || devDefault;
