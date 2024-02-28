// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setDataToStorage(storageKey: string, data: any) {
  return localStorage.setItem(storageKey, JSON.stringify(data));
}

export function getDataFromStorage(storageKey: string) {
  return storageKey !==null && JSON.parse(localStorage.getItem(storageKey)!);
}