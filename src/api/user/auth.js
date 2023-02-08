/* eslint-disable import/no-anonymous-default-export */
import client from "../client";

const login = async (authType, credentials) => {
  return await client.post("/auth/login", {
    ...credentials,
    authType,
  });
};

const loginWithEmail = async (emailOrPhone, password) => {
  return await login("email", { emailOrPhone, password });
};

const register = async (authType, credentials) => {
  return await client.post("/auth/register", {
    ...credentials,
    authType,
  });
};

const registerWithEmail = async (
  lang,
  name,
  email,
  phoneICC,
  phoneNSN,
  password
) => {
  return await register("email", {
    lang,
    name,
    email,
    phoneICC,
    phoneNSN,
    password,
  });
};

export default {
  loginWithEmail,
  registerWithEmail,
};
