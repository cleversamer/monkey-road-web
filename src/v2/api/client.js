import axios from "axios";
import cache from "v2/utils/cache";

// export const serverURL = "http://191.101.229.249";
// export const serverURL = "http://www.monkeyroadcar.com";
export const serverURL = "http://localhost:4000";

const api = axios.create({
  baseURL: serverURL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const get = api.get;
api.get = async (url, axiosConfig, expiryInMins) => {
  const value = cache.get(url);
  if (value) {
    return { ok: true, data: value };
  }

  const response = await get(url, axiosConfig);

  cache.store(url, response.data, expiryInMins);
  return response;
};

export default api;
