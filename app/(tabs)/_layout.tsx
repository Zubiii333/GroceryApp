import { Tabs } from 'expo-router';
import { Home, Store, ShoppingCart, Package, User } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color, focused }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shops"
        options={{
          title: 'Shops',
          tabBarIcon: ({ size, color, focused }) => (
            <Store size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: '',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={[
              styles.cartIconContainer,
              focused && styles.cartIconContainerActive
            ]}>
              <ShoppingCart size={size} color={focused ? '#FFFFFF' : color} />
              <Text style={styles.cartText}>Cart</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ size, color, focused }) => (
            <Package size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color, focused }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  cartIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25, // Move up to extend beyond the tab bar
  },
  cartIconContainerActive: {
    backgroundColor: colors.primary,
  },
  cartText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 2,
  },
});