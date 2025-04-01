import { RequestConfig } from "../http-client";

export default () => {
  return (config: RequestConfig) => {
    config.headers = {
      ...(config.headers || {}),
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    };

    return config;
  };
};
