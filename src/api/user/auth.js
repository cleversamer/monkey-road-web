/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";

const loginWithEmail = async (credentials) => {
  return await client.post("/auth/login/email", credentials);
};

const loginWithGoogle = async () => {
  const googleUser = await getGoogleUser();
  const body = { googleToken: googleUser.user.accessToken };
  return await client.post("/auth/login/google", body);
};

const registerWithEmail = async (credentials) => {
  return await client.post("/auth/register/email", credentials);
};

const registerWithGoogle = async (credentials) => {
  const googleUser = await getGoogleUser();
  const body = { ...credentials, googleToken: googleUser.user.accessToken };
  return await client.post("/auth/register/google", body);
};

const getGoogleUser = async () => {
  return await signInWithPopup(auth, new GoogleAuthProvider());
};

export default {
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
  registerWithGoogle,
};
