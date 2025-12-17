import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useTheme, useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { loadOrders } from '../redux/slices/orderSlice';
import Loader from '../components/Loader';

const OrderHistoryScreen = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { history, loading } = useAppSelector(state => state.orders);
  
  // Reload orders when screen is visited just to be safe
  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <View style={[styles.orderCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.date, { color: colors.text }]}>
          {new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString()}
        </Text>
        <Text style={[styles.price, { color: colors.primary }]}>
          ${item.totalPrice.toFixed(2)}
        </Text>
      </View>
      <Text style={[styles.itemCount, { color: colors.text }]}>
        {item.items.length} Items
      </Text>
    </View>
  );

  if (loading) return <Loader />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>No orders found</Text>
          </View>
        }
      />
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
  orderCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    opacity: 0.7,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemCount: {
    fontSize: 14,
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
});

export default OrderHistoryScreen;
