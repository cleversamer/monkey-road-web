/* eslint-disable import/no-anonymous-default-export */
const tokenKey = "bayanPlatformAuthToken00231";
const languageKey = "monkey-dsajdskjadskajdhas";

const storeToken = (token) => localStorage.setItem(tokenKey, token);

const getToken = () => "Bearer " + localStorage.getItem(tokenKey);

const removeToken = () => localStorage.removeItem(tokenKey);

const getLanguage = () => localStorage.getItem(languageKey) || "en";

const storeLanguage = (language) => localStorage.setItem(languageKey, language);

export default {
  getToken,
  removeToken,
  storeToken,
  getLanguage,
  storeLanguage,
};
