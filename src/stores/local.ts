const localStore = {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string): any {
    const value = localStorage.getItem(key);
    if (value == null) {
      return null;
    }
    return JSON.parse(value);
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
  clearAll() {
    localStorage.clear();
  }
};

export default localStore;
