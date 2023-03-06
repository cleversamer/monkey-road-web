/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v2/auth/storage";

const getRecentlyArrivedPurchaseCars = async (page = 1, limit = 4) => {
  const cacheMins = 1;
  return await client.get(
    `/cars/purchase/recently-arrived?page=${page}&limit=${limit}`,
    {},
    cacheMins
  );
};

const getLatestModelsPurchaseCars = async (page = 1, limit = 4) => {
  const cacheMins = 1;
  return await client.get(
    `/cars/purchase/latest-models?page=${page}&limit=${limit}`,
    {},
    cacheMins
  );
};

const getBestSellerPurchaseCars = async (page = 1, limit = 4) => {
  const cacheMins = 1;
  return await client.get(
    `/cars/purchase/best-seller?page=${page}&limit=${limit}`,
    {},
    cacheMins
  );
};

const searchPurchaseCars = async (
  searchTerm,
  page,
  limit,
  minPrice,
  maxPrice,
  brands,
  colors,
  years
) => {
  const cacheMins = 1;
  return await client.get(
    `/cars/purchase/search?searchTerm=${searchTerm}&page=${page}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}&brands=${brands}&colors=${colors}&years=${years}`,
    {},
    cacheMins
  );
};

const getPurchaseCarDetails = async (carId) => {
  const cacheMins = 1;
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

const getMyPurchaseCars = async (page = 1, limit = 9) => {
  const cacheMins = 1;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/cars/purchase/my?page=${page}&limit=${limit}`,
    config,
    cacheMins
  );
};

const markPurchaseCarAsSold = async (purchaseCarId) => {
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.patch(
    `/cars/purchase/${purchaseCarId}/mark-sold`,
    {},
    config
  );
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
    markPurchaseCarAsSold,
  },
  admin: {},
};
