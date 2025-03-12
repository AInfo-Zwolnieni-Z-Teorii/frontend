export const isServer = false;
export const API_BASE_URL = isServer
	? "https://ainfo-api.vercel.app/api"
	: "/api";
