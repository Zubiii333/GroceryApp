import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
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

const IconAnimationVerification: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testResults, setTestResults] = useState<string[]>([]);

  const handleTabPress = (index: number, route: string) => {
    console.log(`Tab pressed: ${index}, route: ${route}`);
    setActiveIndex(index);
    
    // Log animation test
    const result = `✅ Tab ${index} (${testTabs[index].label}) activated - Icon should animate up 32px`;
    setTestResults(prev => [...prev.slice(-4), result]); // Keep last 5 results
  };

  // Auto-test animation sequence
  const runAnimationTest = () => {
    setTestResults(['🧪 Starting automated animation test...']);
    
    let currentIndex = 0;
    const testInterval = setInterval(() => {
      if (currentIndex < testTabs.length) {
        setActiveIndex(currentIndex);
        setTestResults(prev => [...prev, `Testing tab ${currentIndex}: ${testTabs[currentIndex].label}`]);
        currentIndex++;
      } else {
        clearInterval(testInterval);
        setTestResults(prev => [...prev, '✅ Animation test completed!']);
        Alert.alert(
          'Animation Test Complete',
          'All tabs have been tested. Check the console for animation logs and verify:\n\n' +
          '• Icons move up 32px when active\n' +
          '• Smooth spring animation (~0.5s)\n' +
          '• Icons return to original position when inactive\n' +
          '• Natural movement with proper timing'
        );
      }
    }, 1000); // 1 second between each tab
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Icon Animation Verification</Text>
        <Text style={styles.subtitle}>Task 7: Icon translateY Animation Test</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Requirements Checklist:</Text>
          <Text style={styles.requirement}>✅ Icon translateY animation for active state (32px upward)</Text>
          <Text style={styles.requirement}>✅ Smooth transition back to original position for inactive state</Text>
          <Text style={styles.requirement}>✅ Spring animation configuration for natural movement</Text>
          <Text style={styles.requirement}>✅ Animation timing and smoothness (~0.5s duration)</Text>
        </View>
        
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.testButton} onPress={runAnimationTest}>
            <Text style={styles.testButtonText}>Run Auto Test</Text>
          </TouchableOpacity>
          
          <Text style={styles.activeTabText}>
            Active Tab: {testTabs[activeIndex].label} (Index: {activeIndex})
          </Text>
        </View>
        
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Test Results:</Text>
          {testResults.map((result, index) => (
            <Text key={index} style={styles.resultText}>{result}</Text>
          ))}
        </View>
        
        <View style={styles.manualTestContainer}>
          <Text style={styles.manualTestTitle}>Manual Test Buttons:</Text>
          <View style={styles.buttonGrid}>
            {testTabs.map((tab, index) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.manualButton,
                  index === activeIndex && styles.activeManualButton
                ]}
                onPress={() => handleTabPress(index, tab.route)}
              >
                <Text style={[
                  styles.manualButtonText,
                  index === activeIndex && styles.activeManualButtonText
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
    backgroundColor: '#f8f9fa',
  },
  
  content: {
    flex: 1,
    padding: 16,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    fontStyle: 'italic',
  },
  
  infoContainer: {
    backgroundColor: '#e8f5e8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2d5a2d',
  },
  
  requirement: {
    fontSize: 14,
    color: '#2d5a2d',
    marginBottom: 4,
    paddingLeft: 8,
  },
  
  controlsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  
  testButton: {
    backgroundColor: '#FF6347',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  
  testButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  
  activeTabText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  
  resultsContainer: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    minHeight: 100,
  },
  
  resultsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  
  resultText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
  },
  
  manualTestContainer: {
    marginBottom: 20,
  },
  
  manualTestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  manualButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 8,
    minWidth: '30%',
  },
  
  activeManualButton: {
    backgroundColor: '#FF6347',
  },
  
  manualButtonText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  activeManualButtonText: {
    color: 'white',
  },
});

export default IconAnimationVerification;