import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchProducts } from '../services/api';
import { useTheme, useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { setThemeMode } from '../redux/slices/themeSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const ProductListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { colors, isDark, mode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartItems = useAppSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleTheme = () => {
    // Toggle between light and dark only
    const nextMode = mode === 'dark' ? 'light' : 'dark';
    dispatch(setThemeMode(nextMode));
  };

  const getThemeIcon = () => {
    return mode === 'dark' ? '🌙' : '☀️';
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    // Header with theme toggle and cart
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={toggleTheme} style={styles.headerButton}>
          <Text style={{ fontSize: 20 }}>{getThemeIcon()}</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
            Cart ({cartCount})
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, cartCount, colors, mode]);

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

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    />
  );

  if (loading) return <Loader />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
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
});

export default ProductListScreen;
