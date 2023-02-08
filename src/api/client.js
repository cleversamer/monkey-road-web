import axios from "axios";
import cache from "utils/cache";

const api = axios.create({
  baseURL: "https://191.101.229.249/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const get = api.get;
api.get = async (url, axiosConfig, expiryTimeInSecs) => {
  const value = cache.get(url);
  if (value) {
    return { ok: true, data: value };
  }

  const response = await get(url, axiosConfig);

  cache.store(url, response.data, expiryTimeInSecs);
  return response;
};

export default api;
