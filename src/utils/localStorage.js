const getDataFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data;
};

const setDataInLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const removeDataFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export {
  getDataFromLocalStorage,
  setDataInLocalStorage,
  removeDataFromLocalStorage,
};
