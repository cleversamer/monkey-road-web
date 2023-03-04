/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v2/auth/storage";

////////////////////////////// Common APIs //////////////////////////////
const isAuth = async () => {
  const config = { headers: { Authorization: authStorage.getToken() } };
  const cacheMins = 0;
  return await client.get("/users/isauth", config, cacheMins);
};

const updateProfile = async (profileData) => {
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

  return await client.patch("/users/profile/update", formData, config);
};

const getForgotPasswordCode = async (lang, sendTo, emailOrPhone) => {
  const cacheMins = 0;
  return await client.get(
    `/users/password/forgot?emailOrPhone=${emailOrPhone}&lang=${lang}&sendTo=${sendTo}`,
    {},
    cacheMins
  );
};

const resetPassword = async (emailOrPhone, code, newPassword) => {
  return await client.post("/users/password/forgot", {
    emailOrPhone,
    code,
    newPassword,
  });
};

const changePassword = async (oldPassword, newPassword, confirmPassword) => {
  const config = { headers: { Authorization: authStorage.getToken() } };
  const body = { oldPassword, newPassword, confirmPassword };
  return await client.patch("/users/password/change", body, config);
};

const verify = async (subject, code) => {
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.post(`/users/verify/${subject}`, { code }, config);
};

const resendVerificationCode = async (subject, lang) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/users/verify/${subject}?lang=${lang}`,
    config,
    cacheMins
  );
};

const getMyFavorites = async (page = 1, limit = 10) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/users/favorites/my?page=${page}&limit=${limit}`,
    config,
    cacheMins
  );
};

const addToFavorites = async (purchaseCarId) => {
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.post("/users/favorites/add", { purchaseCarId }, config);
};

const deleteFromFavorites = async (purchaseCarId) => {
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.delete(
    `/users/favorites/delete?purchaseCarId=${purchaseCarId}`,
    config
  );
};

const seeNotifications = async () => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get("/users/notifications/see", config, cacheMins);
};

////////////////////////////// Admin APIs //////////////////////////////
const getCarsStatus = async () => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get("/users/admin/cars/status", config, cacheMins);
};

const exportUsersToExcel = async () => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get("/users/export", config, cacheMins);
};

const findUserByEmailOrPhone = async (emailOrPhone) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/users/admin/profile/find?emailOrPhone=${emailOrPhone}&role=user`,
    config,
    cacheMins
  );
};

const findOfficeByEmailOrPhone = async (emailOrPhone) => {
  const cacheMins = 0;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/users/admin/profile/find?emailOrPhone=${emailOrPhone}&role=office`,
    config,
    cacheMins
  );
};

const updateUserProfile = async (profileData) => {
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

  return await client.patch("/users/admin/profile/update", formData, config);
};

const verifyUser = async (emailOrPhone) => {
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.patch(
    "/users/admin/profile/verify",
    { emailOrPhone },
    config
  );
};

const updateUserRole = async (emailOrPhone, role) => {
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.patch(
    "/users/admin/profile/update-role",
    { emailOrPhone, role },
    config
  );
};

const sendNotificationToUsers = async (
  userIds = [],
  titleEN,
  titleAR,
  bodyEN,
  bodyAR
) => {
  const config = { headers: { Authorization: authStorage.getToken() } };
  const data = { userIds, titleEN, titleAR, bodyEN, bodyAR };
  return await client.post("/users/admin/notification/send", data, config);
};

export default {
  common: {
    isAuth,
    updateProfile,
    getForgotPasswordCode,
    resetPassword,
    changePassword,
    verify,
    resendVerificationCode,
    getMyFavorites,
    addToFavorites,
    deleteFromFavorites,
    seeNotifications,
  },
  office: {},
  admin: {
    getCarsStatus,
    exportUsersToExcel,
    findUserByEmailOrPhone,
    findOfficeByEmailOrPhone,
    updateUserProfile,
    verifyUser,
    updateUserRole,
    sendNotificationToUsers,
  },
};
