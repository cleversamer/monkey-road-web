const prefix = process.env["CACHE_PREFIX_VALUE"];

const store = (key, value, expiryInMins) => {
  try {
    const item = {
      value,
      expiryDate: Date.now() + expiryInMins * 60 * 1000,
    };

    localStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (err) {}
};

const get = (key) => {
  try {
    const value = localStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) {
      return null;
    }

    if (isExpired(item)) {
      localStorage.removeItem(prefix + key);
      return null;
    }

    return item.value;
  } catch (err) {}
};

const isExpired = (item) => {
  return Date.now() > item.expiryDate;
};

// eslint-disable-next-line
export default {
  store,
  get,
};
