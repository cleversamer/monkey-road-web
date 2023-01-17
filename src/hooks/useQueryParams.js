const useQueryParams = () => {
  const queryString = document.location.href.split("?")[1];
  const queryParams = queryString.split("&");
  const queryObject = {};

  queryParams.forEach((param) => {
    const pairs = param.split("=");
    const key = pairs[0];
    const value = pairs[1];
    queryObject[key] = value;
  });

  return queryObject;
};

export default useQueryParams;
