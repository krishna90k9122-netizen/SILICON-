// Safe localStorage service with error handling and fallback defaults

export const storageService = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.warn(`[storageService] Error parsing localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`[storageService] Error setting localStorage key "${key}":`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`[storageService] Error removing localStorage key "${key}":`, error);
      return false;
    }
  },

  clearAll: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn('[storageService] Error clearing localStorage:', error);
      return false;
    }
  }
};
