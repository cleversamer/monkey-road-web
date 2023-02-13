/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "auth/storage";

const getMyOrders = async (skip = 0) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(`/orders/my?skip=${skip}`, config, cacheMins);
};

const getMyReceivedOrders = async (skip = 0) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/orders/my-received?skip=${skip}`,
    config,
    cacheMins
  );
};

const getOrderDetails = async (orderId) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(`/orders/${orderId}/details`, config, cacheMins);
};

export default {
  common: {
    getMyOrders,
    getOrderDetails,
  },
  office: {
    getMyReceivedOrders,
  },
};
