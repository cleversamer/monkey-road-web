/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "auth/storage";

////////////////////////////// Common APIs //////////////////////////////
const isAuth = async () => {
  const config = { headers: { Authorization: authStorage.getToken() } };
  const cacheMins = 0.5;
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
  const cacheMins = 1;
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
  const cacheMins = 1;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(
    `/users/verify/${subject}?lang=${lang}`,
    config,
    cacheMins
  );
};

const getMyFavorites = async () => {
  const cacheMins = 3;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(`/users/favorites/my`, config, cacheMins);
};

const seeNotifications = async () => {
  const cacheMins = 1;
  const config = { headers: { Authorization: authStorage.getToken() } };
  return await client.get(`/users/notifications/see`, config, cacheMins);
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
    seeNotifications,
  },
  student: {},
  admin: {},
};
