import { loadFromStorage, saveToStorage } from '../utils/storage';

const item = 'motoDream_customer';

export function setLocalCustomer(data: object) {
  saveToStorage(item, data);
}

export function getLocalCustomer() {
  return loadFromStorage(item);
}
