export function setItem<T>(key: string, value: T): void {
  const jsonValue = JSON.stringify(value);
  localStorage.setItem(key, jsonValue);
}

export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
    return null;
  } catch (error) {
    // Bắt lỗi parse JSON
    // console.error(`Unable to parse JSON for ${key}: `, error); 
    return null;
  }
}
export function removeItem(key: string): void {
  localStorage.removeItem(key);
}
