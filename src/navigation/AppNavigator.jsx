import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppDispatch, useTheme } from '../hooks/reduxHooks';
import { checkAuthStatus } from '../redux/slices/authSlice';
import { loadOrders } from '../redux/slices/orderSlice';
import { loadThemePreference } from '../redux/slices/themeSlice';

import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useAppDispatch();
  const { colors, isDark } = useTheme();

  useEffect(() => {
    dispatch(checkAuthStatus());
    dispatch(loadOrders());
    dispatch(loadThemePreference());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen 
          name="ProductList" 
          component={ProductListScreen} 
          options={{ title: 'Products' }}
        />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen} 
          options={{ title: 'Product Details' }}
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen} 
          options={{ title: 'My Cart' }}
        />
        <Stack.Screen 
          name="OrderHistory" 
          component={OrderHistoryScreen} 
          options={{ title: 'Order History' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
