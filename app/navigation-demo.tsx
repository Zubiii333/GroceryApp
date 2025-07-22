import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Home, Store, ShoppingCart, Package, User } from 'lucide-react-native';
import AnimatedBottomNavigation from '../components/AnimatedBottomNavigation/AnimatedBottomNavigation';
import { TabConfig } from '../components/AnimatedBottomNavigation/types';

// Tab configuration exactly matching your CSS reference
const DEMO_TABS: TabConfig[] = [
  {
    id: 'home',
    route: '/home',
    icon: Home,
    label: 'Home',
  },
  {
    id: 'shops',
    route: '/shops',
    icon: Store,
    label: 'Shops',
  },
  {
    id: 'cart',
    route: '/cart',
    icon: ShoppingCart,
    label: 'Cart',
  },
  {
    id: 'orders',
    route: '/orders',
    icon: Package,
    label: 'Orders',
  },
  {
    id: 'profile',
    route: '/profile',
    icon: User,
    label: 'Profile',
  },
];

export default function NavigationDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabPress = (index: number, route: string) => {
    console.log(`Tab pressed: ${DEMO_TABS[index].label} (${index})`);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>CSS-Matched Navigation Demo</Text>
        <Text style={styles.subtitle}>
          Current Tab: {DEMO_TABS[activeIndex].label}
        </Text>
        <Text style={styles.description}>
          This navigation exactly matches your CSS reference:
        </Text>
        <View style={styles.features}>
          <Text style={styles.feature}>✓ 400px fixed width</Text>
          <Text style={styles.feature}>✓ 70px tab spacing</Text>
          <Text style={styles.feature}>✓ Tomato indicator</Text>
          <Text style={styles.feature}>✓ -32px icon animation</Text>
          <Text style={styles.feature}>✓ 0.5s transitions</Text>
          <Text style={styles.feature}>✓ Curved shadow elements</Text>
        </View>
      </View>
      
      {/* The navigation component */}
      <AnimatedBottomNavigation
        tabs={DEMO_TABS}
        activeIndex={activeIndex}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222327', // Match CSS body background
  },
  
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: 20,
    color: 'tomato',
    marginBottom: 24,
    fontWeight: '600',
  },
  
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  features: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 300,
  },
  
  feature: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
});