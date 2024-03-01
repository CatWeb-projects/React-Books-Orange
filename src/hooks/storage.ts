export const setDataToStorage = (storageKey: string, data: any) => {
  return localStorage.setItem(storageKey, JSON.stringify(data));
};

export const getDataFromStorage = (storageKey: string) => {
  return storageKey !== null && JSON.parse(localStorage.getItem(storageKey)!);
};
