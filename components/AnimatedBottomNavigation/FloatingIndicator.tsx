import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { FloatingIndicatorProps } from './types';
import { colors, shadows } from '../../constants/theme';

const FloatingIndicator: React.FC<FloatingIndicatorProps> = ({
  activeIndex,
  tabWidth,
  containerWidth,
  animatedStyle,
}) => {
  return (
    <Animated.View style={[styles.indicator, animatedStyle]}>
      {/* Left curved shadow element - CSS ::before */}
      <View style={[styles.shadowElement, styles.leftShadow]} />
      
      {/* Right curved shadow element - CSS ::after */}
      <View style={[styles.shadowElement, styles.rightShadow]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // Match CSS: .indicator
  indicator: {
    position: 'absolute',
    top: -35, // Match CSS: top: -50% (35px of 70px height)
    width: 70,
    height: 70,
    backgroundColor: 'tomato', // Match CSS exactly
    borderRadius: 35, // 50% of 70px
    borderWidth: 6,
    borderColor: '#222327', // Match CSS: var(--clr)
    // transition: 0.5s handled by React Native animation
  },
  
  // Match CSS: .indicator::before and ::after
  shadowElement: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    top: 35, // 50% of indicator height
  },
  
  // Match CSS: .indicator::before
  leftShadow: {
    left: -22,
    borderTopRightRadius: 20,
    backgroundColor: '#222327', // Use solid color instead of shadow for React Native
  },
  
  // Match CSS: .indicator::after  
  rightShadow: {
    right: -22,
    borderTopLeftRadius: 20,
    backgroundColor: '#222327', // Use solid color instead of shadow for React Native
  },
});

export default FloatingIndicator;