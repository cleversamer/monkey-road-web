import axios from "axios";
import cache from "utils/cache";

// export const serverURL = "http://191.101.229.249";
export const serverURL = "https://www.monkeyroadcar.com";

const api = axios.create({
  baseURL: serverURL + "/api",
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
