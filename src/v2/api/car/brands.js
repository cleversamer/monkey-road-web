/* eslint-disable import/no-anonymous-default-export */
import client from "../client";

const getPopularBrands = async (page = 1, limit = 10) => {
  const cacheMins = 0; // 1 day
  return await client.get(
    `/brands/popular?page=${page}&limit=${limit}`,
    {},
    cacheMins
  );
};

export default {
  common: {
    getPopularBrands,
  },
  admin: {},
};
