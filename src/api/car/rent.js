/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "auth/storage";

////////////////////////////// Common APIs //////////////////////////////
const getAllRentCars = async (skip = 0) => {
  const cacheMins = 0;
  return await client.get(`/cars/rent/get?skip=${skip}`, {}, cacheMins);
};

const searchRentCars = async (
  searchTerm,
  skip = 0,
  minPrice,
  maxPrice,
  brands,
  colors,
  years
) => {
  const cacheMins = 0;
  return await client.get(
    `/cars/rent/search?searchTerm=${searchTerm}&skip=${skip}&minPrice=${minPrice}&maxPrice=${maxPrice}&brands=${brands}&colors=${colors}&years=${years}`,
    {},
    cacheMins
  );
};

const getRentCarDetails = async (carId) => {
  const cacheMins = 0;
  return await client.get(`/cars/rent/details/${carId}`, {}, cacheMins);
};

////////////////////////////// Office APIs //////////////////////////////
const postRentCar = async (profileData) => {
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

  return await client.post("/cars/rent/add", formData, config);
};

const getMyRentCars = async (skip = 0) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(`/cars/rent/my?skip=${skip}`, config, cacheMins);
};

////////////////////////////// Admin APIs //////////////////////////////
const getNotAcceptedRentCars = async (skip = 0) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/cars/rent/not-accepted?skip=${skip}`,
    config,
    cacheMins
  );
};

export default {
  common: {
    getAllRentCars,
    searchRentCars,
    getRentCarDetails,
  },
  office: {
    postRentCar,
    getMyRentCars,
  },
  admin: {
    getNotAcceptedRentCars,
  },
};
