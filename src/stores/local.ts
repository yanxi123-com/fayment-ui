import { trackEvent } from "lib/gtag";

const localStore = {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    trackEvent("save_local", { event_label: key });
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
