/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v2/auth/storage";

const getRecentlyArrivedPurchaseCars = async (page = 1, limit = 4) => {
  const cacheMins = 0;
  return await client.get(
    `/cars/purchase/recently-arrived?page=${page}&limit=${limit}`,
    {},
    cacheMins
  );
};

const getLatestModelsPurchaseCars = async (page = 1, limit = 4) => {
  const cacheMins = 0;
  return await client.get(
    `/cars/purchase/latest-models?page=${page}&limit=${limit}`,
    {},
    cacheMins
  );
};

const getBestSellerPurchaseCars = async (page = 1, limit = 4) => {
  const cacheMins = 0;
  return await client.get(
    `/cars/purchase/best-seller?page=${page}&limit=${limit}`,
    {},
    cacheMins
  );
};

const searchPurchaseCars = async (searchTerm, skip = 0) => {
  const cacheMins = 0;
  return await client.get(
    `/cars/purchase/search?searchTerm=${searchTerm}&skip=${skip}`,
    {},
    cacheMins
  );
};

const getPurchaseCarDetails = async (carId) => {
  const cacheMins = 0;
  return await client.get(`/cars/purchase/details/${carId}`, {}, cacheMins);
};

const postPurchaseCar = async (profileData) => {
  const formData = new FormData();
  for (let key in profileData) {
    formData.append(key, profileData[key]);
  }

  const config = {
    headers: {
      Authorization: authStorage.getToken(),
      "Content-Type": "multipart/form-data",
    },
  };

  return await client.post("/cars/purchase/add", formData, config);
};

const getMyPurchaseCars = async (skip = 0) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(`/cars/purchase/my?skip=${skip}`, config, cacheMins);
};

export default {
  common: {
    getRecentlyArrivedPurchaseCars,
    getLatestModelsPurchaseCars,
    getBestSellerPurchaseCars,
    searchPurchaseCars,
    getPurchaseCarDetails,
    postPurchaseCar,
    getMyPurchaseCars,
  },
  admin: {},
};
