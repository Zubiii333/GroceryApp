import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, MapPin, ShoppingBag, Star, Repeat } from 'lucide-react-native';

interface Order {
  id: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  orderNumber: string;
  date: string;
  shop: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  deliveryAddress: string;
  deliveryTime: string;
  rating?: number;
}

const mockOrders: Order[] = [
  {
    id: '1',
    status: 'out_for_delivery',
    orderNumber: 'GD001234',
    date: '2025-01-14',
    shop: 'Green Valley Market',
    items: [
      { name: 'Organic Apples', quantity: 2, price: 4.99, image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { name: 'Fresh Spinach', quantity: 1, price: 2.49, image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ],
    total: 12.47,
    deliveryAddress: '123 Main St, Downtown',
    deliveryTime: '25-35 min',
  },
  {
    id: '2',
    status: 'delivered',
    orderNumber: 'GD001235',
    date: '2025-01-13',
    shop: 'Daily Dairy',
    items: [
      { name: 'Greek Yogurt', quantity: 2, price: 3.99, image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { name: 'Whole Milk', quantity: 1, price: 2.50, image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ],
    total: 10.48,
    deliveryAddress: '123 Main St, Downtown',
    deliveryTime: 'Delivered',
    rating: 4.5,
  },
  {
    id: '3',
    status: 'delivered',
    orderNumber: 'GD001236',
    date: '2025-01-12',
    shop: 'Farm Fresh',
    items: [
      { name: 'Mixed Vegetables', quantity: 1, price: 5.99, image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ],
    total: 5.99,
    deliveryAddress: '123 Main St, Downtown',
    deliveryTime: 'Delivered',
    rating: 4.8,
  },
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending': return '#F59E0B';
    case 'confirmed': return '#3B82F6';
    case 'preparing': return '#8B5CF6';
    case 'out_for_delivery': return '#10B981';
    case 'delivered': return '#059669';
    case 'cancelled': return '#EF4444';
    default: return '#6B7280';
  }
};

const getStatusText = (status: Order['status']) => {
  switch (status) {
    case 'pending': return 'Order Placed';
    case 'confirmed': return 'Confirmed';
    case 'preparing': return 'Preparing';
    case 'out_for_delivery': return 'Out for Delivery';
    case 'delivered': return 'Delivered';
    case 'cancelled': return 'Cancelled';
    default: return status;
  }
};

export default function OrdersScreen() {
  const [selectedTab, setSelectedTab] = useState<'active' | 'history'>('active');

  const activeOrders = mockOrders.filter(order => 
    ['pending', 'confirmed', 'preparing', 'out_for_delivery'].includes(order.status)
  );

  const orderHistory = mockOrders.filter(order => 
    ['delivered', 'cancelled'].includes(order.status)
  );

  const renderOrderItem = (order: Order) => (
    <TouchableOpacity key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot,
              { backgroundColor: getStatusColor(order.status) }
            ]} />
            <Text style={[
              styles.statusText,
              { color: getStatusColor(order.status) }
            ]}>
              {getStatusText(order.status)}
            </Text>
          </View>
        </View>
        <Text style={styles.orderDate}>{order.date}</Text>
      </View>

      <View style={styles.shopInfo}>
        <ShoppingBag size={16} color="#6B7280" />
        <Text style={styles.shopName}>{order.shop}</Text>
      </View>

      <View style={styles.itemsContainer}>
        {order.items.map((item, index) => (
          <View key={index} style={styles.orderItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <View style={styles.deliveryInfo}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.deliveryAddress}>{order.deliveryAddress}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
        </View>
      </View>

      {order.status === 'out_for_delivery' && (
        <View style={styles.trackingContainer}>
          <Clock size={16} color="#10B981" />
          <Text style={styles.trackingText}>Arriving in {order.deliveryTime}</Text>
        </View>
      )}

      {order.status === 'delivered' && (
        <View style={styles.deliveredActions}>
          <TouchableOpacity style={styles.rateButton}>
            <Star size={16} color="#F59E0B" />
            <Text style={styles.rateText}>
              {order.rating ? `Rated ${order.rating}★` : 'Rate Order'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reorderButton}>
            <Repeat size={16} color="#10B981" />
            <Text style={styles.reorderText}>Reorder</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'active' && styles.activeTab
          ]}
          onPress={() => setSelectedTab('active')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'active' && styles.activeTabText
          ]}>
            Active ({activeOrders.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'history' && styles.activeTab
          ]}
          onPress={() => setSelectedTab('history')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'history' && styles.activeTabText
          ]}>
            History ({orderHistory.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.ordersContainer} showsVerticalScrollIndicator={false}>
        {selectedTab === 'active' ? (
          activeOrders.length > 0 ? (
            activeOrders.map(renderOrderItem)
          ) : (
            <View style={styles.emptyContainer}>
              <ShoppingBag size={48} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>No Active Orders</Text>
              <Text style={styles.emptyDescription}>
                You don't have any active orders at the moment.
              </Text>
            </View>
          )
        ) : (
          orderHistory.length > 0 ? (
            orderHistory.map(renderOrderItem)
          ) : (
            <View style={styles.emptyContainer}>
              <Clock size={48} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>No Order History</Text>
              <Text style={styles.emptyDescription}>
                Your order history will appear here.
              </Text>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    margin: 20,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#1F2937',
  },
  ordersContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  orderDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  shopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  shopName: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  itemsContainer: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#6B7280',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deliveryAddress: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  totalContainer: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  trackingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  trackingText: {
    fontSize: 14,
    color: '#10B981',
    marginLeft: 8,
    fontWeight: '500',
  },
  deliveredActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  rateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  rateText: {
    fontSize: 14,
    color: '#92400E',
    marginLeft: 6,
    fontWeight: '500',
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  reorderText: {
    fontSize: 14,
    color: '#10B981',
    marginLeft: 6,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});