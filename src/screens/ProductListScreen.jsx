/**
 * ProductListScreen - Shows all products in a grid
 * Features: Theme toggle, Cart button, Product cards
 */

import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchProducts } from '../services/api';
import { useTheme, useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { setThemeMode } from '../redux/slices/themeSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const ProductListScreen = () => {
  // Navigation hook
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  
  // Get theme colors and mode
  const { colors, isDark, mode } = useTheme();
  
  // Local state for products and loading
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get cart items from Redux store
  const cartItems = useAppSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    const nextMode = mode === 'dark' ? 'light' : 'dark';
    dispatch(setThemeMode(nextMode));
  };

  // Get icon based on current theme
  const getThemeIcon = () => {
    return mode === 'dark' ? '🌙' : '☀️';
  };

  // Load products when screen mounts
  useEffect(() => {
    loadProducts();
  }, []);

  // Update header buttons when theme or cart changes
  useEffect(() => {
    navigation.setOptions({
      // Theme toggle on left
      headerLeft: () => (
        <TouchableOpacity onPress={toggleTheme} style={styles.headerButton}>
          <Text style={styles.themeIcon}>{getThemeIcon()}</Text>
        </TouchableOpacity>
      ),
      // Cart button on right
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Text style={[styles.cartButton, { color: colors.primary }]}>
            Cart ({cartCount})
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, cartCount, colors, mode]);

  // Fetch products from API
  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Render each product card
  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    />
  );

  // Show loader while fetching products
  if (loading) return <Loader />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Product grid - 2 columns */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Order History button at bottom */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('OrderHistory')}
        style={[styles.historyButton, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <Text style={{ color: colors.primary }}>View Order History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 8,
  },
  historyButton: {
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  headerButton: {
    marginLeft: 10,
  },
  themeIcon: {
    fontSize: 20,
  },
  cartButton: {
    fontWeight: 'bold',
  },
});

export default ProductListScreen;
