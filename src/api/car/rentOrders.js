/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "auth/storage";

const getMyOrders = async (skip = 0) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(`/orders/rent/my?skip=${skip}`, config, cacheMins);
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
  return await client.get(`/orders/rent/${orderId}/details`, config, cacheMins);
};

const cancelOrder = async (orderId) => {
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.patch(`/orders/rent/${orderId}/close`, {}, config);
};

const deleteOrder = async (orderId) => {
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.delete(`/orders/rent/${orderId}/delete`, config);
};

const getAllOrders = async (skip = 0) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/orders/rent/admin/all?skip=${skip}`,
    config,
    cacheMins
  );
};

export default {
  common: {
    getMyOrders,
    getOrderDetails,
    cancelOrder,
    deleteOrder,
  },
  office: {
    getMyReceivedOrders,
  },
  admin: {
    getAllOrders,
  },
};
