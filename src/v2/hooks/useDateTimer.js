import { useState, useEffect } from "react";
import parseDate from "v2/utils/parseDate";
import useLocale from "./useLocale";

const useDateTimer = (date, dependencyArray = []) => {
  const { lang } = useLocale();
  const [value, setValue] = useState(parseDate(date, lang));

  useEffect(() => {
    if (!date) return;

    const intervalId = setInterval(() => {
      setValue(parseDate(date, lang));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };

    // eslint-disable-next-line
  }, [lang, date, ...dependencyArray]);

  return { value };
};

export default useDateTimer;
