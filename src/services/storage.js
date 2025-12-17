import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER: '@ecommerce_user',
  ORDERS: '@ecommerce_orders',
  THEME: '@ecommerce_theme',
};

export const StorageService = {
  saveUser: async (user) => {
    try {
      await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user', e);
    }
  },
  getUser: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEYS.USER);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Failed to get user', e);
      return null;
    }
  },
  clearUser: async () => {
    try {
      await AsyncStorage.removeItem(KEYS.USER);
    } catch (e) {
      console.error('Failed to clear user', e);
    }
  },
  saveOrders: async (orders) => {
    try {
      await AsyncStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  },
  getOrders: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEYS.ORDERS);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Failed to get orders', e);
      return [];
    }
  },
  saveTheme: async (mode) => {
    try {
      await AsyncStorage.setItem(KEYS.THEME, mode);
    } catch (e) {
      console.error('Failed to save theme', e);
    }
  },
  getTheme: async () => {
    try {
      return await AsyncStorage.getItem(KEYS.THEME);
    } catch (e) {
      console.error('Failed to get theme', e);
      return null;
    }
  },
};
