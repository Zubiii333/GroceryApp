import { StyleSheet } from 'react-native';

// Shared styling constants and utilities
export const NAVIGATION_HEIGHT = 70;
export const INDICATOR_SIZE = 70;
export const INDICATOR_OFFSET = INDICATOR_SIZE / 2; // 50% above navigation bar
export const ICON_TRANSLATE_Y = -32; // Upward movement for active icons
export const ANIMATION_DURATION = 500; // Animation duration in ms

// Color constants
export const COLORS = {
  INDICATOR_BACKGROUND: '#FF6347', // Tomato color
  NAVIGATION_BACKGROUND: '#FFFFFF',
  SHADOW_COLOR: '#000000',
  ACTIVE_ICON_COLOR: '#FFFFFF',
  INACTIVE_ICON_COLOR: '#666666',
  TEXT_COLOR: '#FFFFFF',
};

// Common styles that will be used across components
export const commonStyles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});