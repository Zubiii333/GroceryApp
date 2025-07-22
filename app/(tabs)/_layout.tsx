import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import CleanNavbar from '../../components/CleanNavbar';

export default function CustomTabLayout() {
  return (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
      
      {/* New CleanNavbar */}
      <View style={styles.navigation}>
        <CleanNavbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // White background to match the design
  },
  
  content: {
    flex: 1,
  },
  
  navigation: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
  },
});