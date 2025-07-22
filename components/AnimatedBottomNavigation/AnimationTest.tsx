import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Store, ShoppingCart, Package, User } from 'lucide-react-native';
import AnimatedBottomNavigation from './AnimatedBottomNavigation';
import { TabConfig } from './types';
import { colors, spacing, typography } from '../../constants/theme';

// Test tab configuration matching the 5 tabs from requirements
const TEST_TABS: TabConfig[] = [
  {
    id: 'home',
    route: '/',
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
    isSpecial: true,
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

const AnimationTest: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoTesting, setIsAutoTesting] = useState(false);

  // Auto-test function to cycle through all tabs
  useEffect(() => {
    if (!isAutoTesting) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TEST_TABS.length);
    }, 1000); // Change tab every 1 second

    return () => clearInterval(interval);
  }, [isAutoTesting]);

  const handleTabPress = (index: number, route: string) => {
    console.log(`Tab pressed: ${index}, Route: ${route}`);
    setActiveIndex(index);
  };

  const startAutoTest = () => {
    setIsAutoTesting(true);
    setActiveIndex(0);
  };

  const stopAutoTest = () => {
    setIsAutoTesting(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Indicator Animation Test</Text>
        <Text style={styles.subtitle}>
          Current Tab: {TEST_TABS[activeIndex].label} (Index: {activeIndex})
        </Text>
        
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.button, isAutoTesting && styles.buttonDisabled]}
            onPress={startAutoTest}
            disabled={isAutoTesting}
          >
            <Text style={styles.buttonText}>Start Auto Test</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, !isAutoTesting && styles.buttonDisabled]}
            onPress={stopAutoTest}
            disabled={!isAutoTesting}
          >
            <Text style={styles.buttonText}>Stop Auto Test</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.manualControls}>
          <Text style={styles.controlsTitle}>Manual Test:</Text>
          <View style={styles.tabButtons}>
            {TEST_TABS.map((tab, index) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabButton,
                  index === activeIndex && styles.tabButtonActive
                ]}
                onPress={() => handleTabPress(index, tab.route)}
              >
                <Text style={[
                  styles.tabButtonText,
                  index === activeIndex && styles.tabButtonTextActive
                ]}>
                  {index}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* The animated navigation component being tested */}
      <AnimatedBottomNavigation
        tabs={TEST_TABS}
        activeIndex={activeIndex}
        onTabPress={handleTabPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  header: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  title: {
    ...typography.styles.title,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  
  subtitle: {
    ...typography.styles.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  
  controls: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  
  buttonDisabled: {
    backgroundColor: colors.border,
  },
  
  buttonText: {
    color: colors.background,
    fontWeight: '600',
  },
  
  manualControls: {
    alignItems: 'center',
  },
  
  controlsTitle: {
    ...typography.styles.body,
    color: colors.text,
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  
  tabButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  
  tabButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  tabButtonActive: {
    backgroundColor: colors.primary,
  },
  
  tabButtonText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  
  tabButtonTextActive: {
    color: colors.background,
  },
});

export default AnimationTest;