/* eslint-disable import/no-anonymous-default-export */
import client from "../client";

const getPopularBrands = async (skip = 0) => {
  const cacheMins = 1440; // 1 day
  return await client.get(`/brands/popular?skip=${skip}`, {}, cacheMins);
};

export default {
  common: {
    getPopularBrands,
  },
  admin: {},
};
