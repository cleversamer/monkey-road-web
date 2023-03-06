/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v2/auth/storage";

//////////////////// COMMON ////////////////////
const getPopularBrands = async (page = 1, limit = 10) => {
  const cacheMins = 10;
  return await client.get(
    `/brands/popular?page=${page}&limit=${limit}`,
    {},
    cacheMins
  );
};

//////////////////// ADMIN ////////////////////
const addBrand = async (data) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }

  const config = {
    headers: {
      Authorization: authStorage.getToken(),
      "Content-Type": "multipart/form-data",
    },
  };

  return await client.post("/brands/add", formData, config);
};

export default {
  common: {
    getPopularBrands,
  },
  admin: {
    addBrand,
  },
};
