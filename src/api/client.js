import axios from "axios";
import cache from "utils/cache";

const api = axios.create({
  baseURL: "http://191.101.229.249/api",
  // baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const get = api.get;
api.get = async (url, axiosConfig, expiryTimeInSecs) => {
  const value = cache.get(url);
  if (value) {
    console.log(url, "fetched from cache");
    return { ok: true, data: value };
  }

  const response = await get(url, axiosConfig);
  console.log(url, "fetched from api");

  cache.store(url, response.data, expiryTimeInSecs);
  return response;
};

export default api;
