/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v2/auth/storage";

////////////////////////////// Common APIs //////////////////////////////
const getAllRentCars = async (page = 1, limit = 10) => {
  const cacheMins = 0;
  return await client.get(
    `/cars/rent/get?page=${page}&limit=${limit}`,
    {},
    cacheMins
  );
};

const searchRentCars = async (
  searchTerm,
  page,
  limit,
  minPrice,
  maxPrice,
  brands,
  colors,
  years
) => {
  const cacheMins = 0;
  return await client.get(
    `/cars/rent/search?searchTerm=${searchTerm}&page=${page}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}&brands=${brands}&colors=${colors}&years=${years}`,
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

const getMyRentCars = async (page = 1, limit = 9) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/cars/rent/my?page=${page}&limit=${limit}`,
    config,
    cacheMins
  );
};

////////////////////////////// Admin APIs //////////////////////////////
const getNotAcceptedRentCars = async (page = 1, limit = 3) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/cars/rent/not-accepted?page=${page}&limit=${limit}`,
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
