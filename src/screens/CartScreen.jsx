/**
 * CartScreen - Shows items in the cart
 * Features: Remove items, Total price, Place order
 */

import React from 'react';
import { View, FlatList, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme, useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { removeFromCart, clearCart } from '../redux/slices/cartSlice';
import { placeOrder } from '../redux/slices/orderSlice';
import CustomButton from '../components/CustomButton';

const CartScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  
  // Get cart items and total from Redux
  const { items, totalPrice } = useAppSelector(state => state.cart);

  // Create order and save to history
  const handlePlaceOrder = async () => {
    if (items.length === 0) return;

    // Create order object
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: items,
      totalPrice: totalPrice,
    };

    try {
      // Save order and clear cart
      await dispatch(placeOrder(newOrder)).unwrap();
      dispatch(clearCart());
      Alert.alert('Success', 'Order Placed Successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('OrderHistory') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to place order');
    }
  };

  // Render each cart item
  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { backgroundColor: colors.card }]}>
      {/* Item image */}
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      
      {/* Item details */}
      <View style={styles.itemDetails}>
        <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.itemPrice, { color: colors.primary }]}>
          ${item.price} x {item.quantity}
        </Text>
      </View>
      
      {/* Remove button */}
      <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
        <Text style={[styles.removeButton, { color: colors.error }]}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Cart items list */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>Your cart is empty</Text>
          </View>
        }
      />
      
      {/* Footer with total and place order button */}
      {items.length > 0 && (
        <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>Total:</Text>
            <Text style={[styles.totalAmount, { color: colors.primary }]}>${totalPrice.toFixed(2)}</Text>
          </View>
          <CustomButton title="Place Order" onPress={handlePlaceOrder} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 14,
    marginTop: 4,
  },
  removeButton: {
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    opacity: 0.6,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
