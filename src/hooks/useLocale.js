import { useContext } from "react";
import AuthContext from "auth/context";
import locale from "static/locale.json";
import authStorage from "auth/storage";

const useLocale = () => {
  const { lang, setLang } = useContext(AuthContext);

  const i18n = (key) => {
    try {
      return locale[key][lang];
    } catch (err) {
      return "err";
    }
  };

  const switchLang = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    authStorage.storeLanguage(newLang);
    setLang(newLang);
  };

  return { i18n, switchLang, lang };
};

export default useLocale;
