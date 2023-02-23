const useQueryParams = () => {
  try {
    const queryString = "?" + document.location.href.split("?")[1];
    const queryParams = new URLSearchParams(queryString);

    const obj = {};
    queryParams.forEach((value, key) => (obj[key] = value));

    return obj;
  } catch (err) {
    return {};
  }
};

export default useQueryParams;
