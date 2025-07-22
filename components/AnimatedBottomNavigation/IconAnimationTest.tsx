import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Home, ShoppingBag, ShoppingCart, Package, User } from 'lucide-react-native';
import AnimatedBottomNavigation from './AnimatedBottomNavigation';
import { TabConfig } from './types';

// Test tabs configuration
const testTabs: TabConfig[] = [
  { id: 'home', route: '/', icon: Home, label: 'Home' },
  { id: 'shops', route: '/shops', icon: ShoppingBag, label: 'Shops' },
  { id: 'cart', route: '/cart', icon: ShoppingCart, label: 'Cart', isSpecial: true },
  { id: 'orders', route: '/orders', icon: Package, label: 'Orders' },
  { id: 'profile', route: '/profile', icon: User, label: 'Profile' },
];

const IconAnimationTest: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabPress = (index: number, route: string) => {
    console.log(`Tab pressed: ${index}, route: ${route}`);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Icon Animation Test</Text>
        <Text style={styles.subtitle}>Active Tab: {testTabs[activeIndex].label}</Text>
        
        {/* Test buttons to quickly switch tabs */}
        <View style={styles.buttonContainer}>
          {testTabs.map((tab, index) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.testButton,
                index === activeIndex && styles.activeButton
              ]}
              onPress={() => handleTabPress(index, tab.route)}
            >
              <Text style={styles.buttonText}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.instructions}>
          Tap tabs to test icon animation:
          {'\n'}• Icons should move up 32px when active
          {'\n'}• Smooth spring animation (0.5s)
          {'\n'}• Icons return to original position when inactive
        </Text>
      </View>
      
      <AnimatedBottomNavigation
        tabs={testTabs}
        activeIndex={activeIndex}
        onTabPress={handleTabPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  
  testButton: {
    backgroundColor: '#ddd',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  
  activeButton: {
    backgroundColor: '#FF6347',
  },
  
  buttonText: {
    color: '#333',
    fontWeight: '500',
  },
  
  instructions: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default IconAnimationTest;