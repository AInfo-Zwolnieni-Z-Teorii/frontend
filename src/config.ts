export const isServer = false; // Set to true for production, false for local development

export const API_BASE_URL = isServer
  ? "https://ainfo-api.vercel.app/api"
  : "/api";