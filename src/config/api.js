/**
 * Centralized API URL Configuration for EchoGraph Frontend
 * Automatically reads VITE_API_URL from .env file or environment variables.
 * Defaults to local backend (http://localhost:8000) for seamless offline development.
 */
export const API_URL = (import.meta.env.API_URL || "https://echograph-frontend.vercel.app").replace(/\/+$/, "");

export default API_URL;
