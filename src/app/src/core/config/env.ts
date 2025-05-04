const { VITE_API_URL = "", VITE_NODE_ENV = "env" } = import.meta.env;

export const EnvConfig = {
  environment: VITE_NODE_ENV,
  apiUrl: VITE_API_URL,
};
