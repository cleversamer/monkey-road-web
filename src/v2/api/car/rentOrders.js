/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v2/auth/storage";

//////////////////// COMMON ////////////////////
const getMyOrders = async (page = 1, limit = 10) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/orders/rent/my?page=${page}&limit=${limit}`,
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

//////////////////// OFFICE ////////////////////
const getMyReceivedOrders = async (page = 1, limit = 10) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/orders/rent/my-received?page=${page}&limit=${limit}`,
    config,
    cacheMins
  );
};

//////////////////// ADMIN ////////////////////
const getAllOrders = async (page = 1, limit = 3) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/orders/rent/admin/all?page=${page}&limit=${limit}`,
    config,
    cacheMins
  );
};

const getOfficeReceivedOrders = async (officeId, page = 1, limit = 3) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/orders/rent/admin/${officeId}/received?page=${page}&limit=${limit}`,
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
    getOfficeReceivedOrders,
  },
};
