/**
 * ProductDetailScreen - Shows full details of a single product
 * Features: Product info, Add to Cart, Login modal if not authenticated
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme, useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { addToCart } from '../redux/slices/cartSlice';
import CustomButton from '../components/CustomButton';
import LoginModal from '../components/LoginModal';

const ProductDetailScreen = () => {
  // Get product from navigation params
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  
  // Theme and Redux hooks
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  
  // Check if user is logged in
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  
  // Get cart count for header badge
  const cartItems = useAppSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // State for login modal visibility
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Set cart button in header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Text style={[styles.cartButton, { color: colors.primary }]}>
            Cart ({cartCount})
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, cartCount, colors]);

  // Handle add to cart - shows login modal if not authenticated
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      dispatch(addToCart(product));
      Alert.alert('Success', 'Item added to cart!');
    }
  };

  // Called after successful login
  const handleLoginSuccess = () => {
    Alert.alert('Logged In', 'You can now add items to cart.');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Product details in scrollable area */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Product image */}
        <Image 
          source={{ uri: product.image }} 
          style={styles.image} 
          resizeMode="contain" 
        />
        
        {/* Product info */}
        <View style={styles.details}>
          <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
          
          {/* Price and rating row */}
          <View style={styles.headerRow}>
            <Text style={[styles.price, { color: colors.primary }]}>${product.price}</Text>
            <Text style={[styles.rating, { color: colors.text }]}>
              ★ {product.rating.rate} ({product.rating.count})
            </Text>
          </View>
          
          {/* Description */}
          <Text style={[styles.description, { color: colors.text }]}>{product.description}</Text>
          
          {/* Category tag */}
          <Text style={[styles.category, { color: colors.secondary }]}>#{product.category}</Text>
        </View>
      </ScrollView>

      {/* Fixed footer with Add to Cart button */}
      <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <CustomButton title="Add to Cart" onPress={handleAddToCart} />
      </View>

      {/* Login modal - shows when user tries to add to cart without logging in */}
      <LoginModal
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for fixed footer
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    marginTop: 16,
  },
  details: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 16,
    opacity: 0.7,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    opacity: 0.8,
  },
  category: {
    fontSize: 14,
    fontStyle: 'italic',
    textTransform: 'capitalize',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
  },
  cartButton: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ProductDetailScreen;
