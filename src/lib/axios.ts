import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { toast } from "sonner";
import { API_BASE_URL, AUTH_ROUTE } from "./constants";

// ── Axios Instance ───────────────────────────────────────────────────
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ── Refresh State (prevents parallel refresh calls) ──────────────────
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
}

// ── Auth helpers ─────────────────────────────────────────────────────
function clearAuthAndRedirect() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    // Clear the HttpOnly session cookie
    fetch('/api/auth/session', { method: 'DELETE' }).catch(() => {});
    // Only redirect if not already on the sign-in page
    if (!window.location.pathname.includes("/sign-in")) {
      toast.error("Session Expired", {
        description: "Please sign in again to continue.",
      });
      window.location.href = "/sign-in";
    }
  }
}

// ── Request Interceptor ──────────────────────────────────────────────
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Do not attach the custom token for auth routes like sign-in or refresh
    const isAuthRoute =
      config.url?.includes("/sign-in") || config.url?.includes("/refresh");

    if (isAuthRoute) {
      return config;
    }

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ─────────────────────────────────────────────
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!error.response) {
      toast.error("Network Error", {
        description:
          "Unable to reach the server. Please check your connection.",
      });
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const serverMessage = data?.message;

    // ── 401 — Attempt silent refresh before giving up ────────────
    if (status === 401 && !originalRequest._retry) {
      // If this IS the sign-in request itself, don't try refresh
      const requestUrl = originalRequest.url || "";
      if (
        requestUrl.includes("/sign-in") ||
        requestUrl.includes("/refresh")
      ) {
        if (requestUrl.includes("/sign-in")) {
          toast.error("Invalid Credentials", {
            description:
              serverMessage || "Email or password is incorrect.",
          });
        }

        return Promise.reject(error);
      }

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject: (err: unknown) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data: refreshData } = await api.post<{
          data: { accessToken: string; refreshToken: string };
          message: string;
        }>(`${AUTH_ROUTE}/refresh`);

        const newAccessToken = refreshData.data.accessToken;

        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", newAccessToken);
        }

        // Process queued requests with the new token
        processQueue(null, newAccessToken);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed — clear everything and redirect to sign-in
        processQueue(refreshError, null);
        clearAuthAndRedirect();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ── 403 — Forbidden: clear tokens + redirect ─────────────────
    if (status === 403) {
      toast.error("Access Denied", {
        description:
          serverMessage ||
          "You do not have permission to perform this action.",
      });
      // Remove access token (user is not authorized for this resource)
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
      // Redirect to sign-in
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/sign-in")
      ) {
        window.location.href = "/sign-in";
      }
      return Promise.reject(error);
    }

    // ── All other status codes ───────────────────────────────────
    switch (status) {
      case 400:
        toast.error("Bad Request", {
          description:
            serverMessage ||
            "The request was invalid. Please check your input.",
        });
        break;

      case 404:
        toast.error("Not Found", {
          description:
            serverMessage || "The requested resource was not found.",
        });
        break;

      case 409:
        toast.warning("Conflict", {
          description:
            serverMessage ||
            "A conflict occurred with the current state.",
        });
        break;

      case 422:
        toast.error("Validation Error", {
          description:
            serverMessage ||
            "Please check the form fields and try again.",
        });
        break;

      case 429:
        toast.warning("Too Many Requests", {
          description:
            serverMessage ||
            "You are being rate-limited. Please wait and try again.",
        });
        break;

      case 500:
        toast.error("Server Error", {
          description:
            serverMessage ||
            "Something went wrong on our end. Please try again later.",
        });
        break;

      case 502:
        toast.error("Bad Gateway", {
          description:
            serverMessage ||
            "The server received an invalid response.",
        });
        break;

      case 503:
        toast.error("Service Unavailable", {
          description:
            serverMessage ||
            "The service is temporarily unavailable. Please try later.",
        });
        break;

      default:
        toast.error(`Error ${status}`, {
          description: serverMessage || "An unexpected error occurred.",
        });
    }

    return Promise.reject(error);
  }
);

export default api;
