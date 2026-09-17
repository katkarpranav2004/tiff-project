import axios from 'axios';

/**
 * Central API client.
 * Base URL comes from VITE_API_URL so the app works in dev and production
 * without hardcoding http://localhost:5000 across components.
 */
export const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ||
  'http://localhost:5000';

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
});

// Attach the admin access token (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Resolve an uploaded-file URL for use in <img>/<a>.
 * The server may return an absolute URL (http://host/uploads/x) or a
 * relative path (/uploads/x); both are handled here.
 */
export function fileUrl(url?: string | null): string {
  if (!url) return '';
  if (/^https?:\/\//i.test(url) || url.startsWith('data:')) return url;
  return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}

/** Standard API envelope: { success, data, pagination? } */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: { page: number; limit: number; total: number; totalPages: number };
  error?: string;
  message?: string;
}
