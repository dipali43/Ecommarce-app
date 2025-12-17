import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/reduxHooks';

const ProductCard = ({ product, onPress }) => {
  const { colors } = useTheme();

  // Shorten title for card display
  const title = product.title.length > 40 ? product.title.substring(0, 40) + '...' : product.title;

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]} 
      onPress={onPress}
    >
      <Image 
        source={{ uri: product.image }} 
        style={styles.image} 
        resizeMode="contain" 
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.price, { color: colors.primary }]}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    width: '48%', // Approx 2 columns
    marginHorizontal: '1%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#fff', // Images often have white backgrounds
    marginVertical: 8,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    height: 40, // Fixed height for 2 lines approx
    lineHeight: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductCard;
