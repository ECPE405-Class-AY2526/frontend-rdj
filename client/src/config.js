// Central API base URL configuration for client (web)
// Uses Vite environment variable if provided, falls back to localhost for local dev
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";
