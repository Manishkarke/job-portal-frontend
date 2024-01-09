import Cookies from "js-cookie";

const getDataFromCookies = (key) => {
  const data = Cookies.get(key);
  return data;
};

const setDataInCookies = (key, value) => {
  Cookies.set(key, value);
};

const removeDataFromCookies = (key) => {
  Cookies.remove(key);
};

export { getDataFromCookies, setDataInCookies, removeDataFromCookies };
