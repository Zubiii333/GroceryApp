import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, User, MessageCircle, Camera, Settings } from 'lucide-react-native';
import AnimatedBottomNavigation from './AnimatedBottomNavigation';
import { TabConfig } from './types';

// Exact tabs from your CSS reference
const CSS_REFERENCE_TABS: TabConfig[] = [
  {
    id: 'home',
    route: '/home',
    icon: Home,
    label: 'Home',
  },
  {
    id: 'profile',
    route: '/profile',
    icon: User,
    label: 'Profile',
  },
  {
    id: 'message',
    route: '/message',
    icon: MessageCircle,
    label: 'Message',
  },
  {
    id: 'photos',
    route: '/photos',
    icon: Camera,
    label: 'Photos',
  },
  {
    id: 'settings',
    route: '/settings',
    icon: Settings,
    label: 'Settings',
  },
];

const CSSMatchTest: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabPress = (index: number, route: string) => {
    console.log(`Tab pressed: ${index}, Route: ${route}`);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>CSS Reference Match Test</Text>
        <Text style={styles.subtitle}>
          Testing React Native implementation against CSS reference
        </Text>
        <Text style={styles.currentTab}>
          Current: {CSS_REFERENCE_TABS[activeIndex].label} (Index: {activeIndex})
        </Text>
        
        <View style={styles.features}>
          <Text style={styles.featureTitle}>Expected Features:</Text>
          <Text style={styles.feature}>✓ 400px fixed width container</Text>
          <Text style={styles.feature}>✓ 350px inner tabs container</Text>
          <Text style={styles.feature}>✓ 70px tab width and height</Text>
          <Text style={styles.feature}>✓ Tomato indicator background</Text>
          <Text style={styles.feature}>✓ -32px icon translateY when active</Text>
          <Text style={styles.feature}>✓ Text opacity 0→1 and translateY 20px→10px</Text>
          <Text style={styles.feature}>✓ 0.5s transition timing</Text>
          <Text style={styles.feature}>✓ Curved shadow elements</Text>
        </View>

        <View style={styles.testButtons}>
          <Text style={styles.testTitle}>Quick Test:</Text>
          <View style={styles.buttonRow}>
            {CSS_REFERENCE_TABS.map((tab, index) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.testButton,
                  index === activeIndex && styles.testButtonActive
                ]}
                onPress={() => handleTabPress(index, tab.route)}
              >
                <Text style={[
                  styles.testButtonText,
                  index === activeIndex && styles.testButtonTextActive
                ]}>
                  {index}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* The navigation component matching CSS reference */}
      <AnimatedBottomNavigation
        tabs={CSS_REFERENCE_TABS}
        activeIndex={activeIndex}
        onTabPress={handleTabPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light background to see the navigation clearly
  },
  
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222327',
    marginBottom: 8,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  
  currentTab: {
    fontSize: 18,
    color: '#222327',
    marginBottom: 24,
    fontWeight: '600',
  },
  
  features: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    width: '100%',
    maxWidth: 400,
  },
  
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222327',
    marginBottom: 8,
  },
  
  feature: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  
  testButtons: {
    alignItems: 'center',
  },
  
  testTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222327',
    marginBottom: 12,
  },
  
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  
  testButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  testButtonActive: {
    backgroundColor: 'tomato',
  },
  
  testButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  
  testButtonTextActive: {
    color: '#fff',
  },
});

export default CSSMatchTest;