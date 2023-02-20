/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "auth/storage";

const getRecentlyArrivedPurchaseCars = async (skip = 0) => {
  const cacheMins = 0;
  return await client.get(
    `/cars/purchase/recently-arrived?skip=${skip}`,
    {},
    cacheMins
  );
};

const getLatestModelsPurchaseCars = async (skip = 0) => {
  const cacheMins = 0;
  return await client.get(
    `/cars/purchase/latest-models?skip=${skip}`,
    {},
    cacheMins
  );
};

const getBestSellerPurchaseCars = async (skip = 0) => {
  const cacheMins = 0;
  return await client.get(
    `/cars/purchase/best-seller?skip=${skip}`,
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
