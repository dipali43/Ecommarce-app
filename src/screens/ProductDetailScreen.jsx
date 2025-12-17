import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme, useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { addToCart } from '../redux/slices/cartSlice';
import CustomButton from '../components/CustomButton';
import LoginModal from '../components/LoginModal';

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAddToCart = () => {
    console.log('Is Authenticated:', isAuthenticated);
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      dispatch(addToCart(product));
      Alert.alert('Success', 'Item added to cart!');
    }
  };

  const handleLoginSuccess = () => {
    // Retry logic could go here if needed, or just let user click again
    Alert.alert('Logged In', 'You can now add items to cart.');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image} 
          resizeMode="contain" 
        />
        <View style={styles.details}>
          <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
          <View style={styles.headerRow}>
             <Text style={[styles.price, { color: colors.primary }]}>${product.price}</Text>
             <Text style={[styles.rating, { color: colors.text }]}>★ {product.rating.rate} ({product.rating.count})</Text>
          </View>
          <Text style={[styles.description, { color: colors.text }]}>{product.description}</Text>
          <Text style={[styles.category, { color: colors.secondary }]}>#{product.category}</Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <CustomButton title="Add to Cart" onPress={handleAddToCart} />
      </View>

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
    paddingBottom: 100,
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
});

export default ProductDetailScreen;
