import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { NavigationTabProps } from './types';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

export const NavigationTab: React.FC<NavigationTabProps> = ({
  config,
  isActive,
  onPress,
  animatedStyle,
}) => {
  const IconComponent = config.icon;

  return (
    <View style={styles.listItem}>
      <TouchableOpacity
        style={styles.link}
        onPress={onPress}
        activeOpacity={1}
        accessibilityLabel={`${config.label} tab`}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive }}
      >
        {/* Icon Container - matches CSS .icon */}
        <AnimatedView style={[styles.iconContainer, animatedStyle.icon]}>
          <IconComponent
            size={24} // Match CSS font-size: 1.5em (24px)
            color="#222327" // Match CSS var(--clr)
          />
        </AnimatedView>

        {/* Text Label - matches CSS .text */}
        <AnimatedText style={[styles.textLabel, animatedStyle.text]}>
          {config.label}
        </AnimatedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Match CSS: .navigation ul li
  listItem: {
    position: 'relative',
    width: 70,
    height: 70,
    zIndex: 1,
  },
  
  // Match CSS: .navigation ul li a
  link: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Match CSS: .navigation ul li a .icon
  iconContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 70,
    fontSize: 24, // 1.5em
    textAlign: 'center',
    color: '#222327', // var(--clr)
    // transition: 0.5s is handled by React Native animation
  },
  
  // Match CSS: .navigation ul li a .text
  textLabel: {
    position: 'absolute',
    color: '#222327', // var(--clr)
    fontWeight: '400',
    fontSize: 12, // 0.75em
    letterSpacing: 0.8, // 0.05em
    opacity: 0, // Default hidden
    transform: [{ translateY: 20 }], // Default position
    // Animation will control opacity and translateY
  },
});