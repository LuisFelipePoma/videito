import { EnvConfig } from "@core/config/env";
import axiosI, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { logout } from "../utils/logout";

// Base URLs
const baseURLAPI =
  EnvConfig.environment === "production"
    ? EnvConfig.apiUrl
    : "https://localhost:3000/api/v1";

// Abstract HTTP client class
abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  constructor(baseURL: string, withCredentials: boolean = false) {
    this.instance = axiosI.create({
      baseURL,
      withCredentials,
    });
    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.instance.interceptors.request.use((config) => {
      // Only add token if it exists
      const token = Cookies.get("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    // handle if return "NOT AUTHORIZED 401"
    this.instance.interceptors.response.use(
      (response) => {
        // add a delay of 150ms
        return new Promise((resolve) =>
          setTimeout(() => resolve(response), 350)
        );
      },
      (error) => {
        if (error.response?.status === 401) {
          // Simply logout on unauthorized
          console.log("Unauthorized, logging out...");
          logout();
        }
        return Promise.reject(error);
      }
    );
  }

  // Public getter to access the axios instance
  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

// API client implementation
class ApiClient extends HttpClient {
  constructor(service: string) {
    super(baseURLAPI + service, false); // API requests with credentials
  }
}

// Export instances
export const ClientApi = {
  auth: new ApiClient("/auth").getInstance(),
};

export default ClientApi;
