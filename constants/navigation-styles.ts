import { StyleSheet } from 'react-native';

export const navigationStyles = StyleSheet.create({
  // Root variables (for reference)
  // --clr: #222327
  // --background: oklch(1 0 0)
  // --foreground: oklch(0.145 0 0)
  
  // Navigation container
  navigation: {
    position: 'relative',
    width: 400,
    height: 70,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Navigation list
  ul: {
    flexDirection: 'row',
    width: 350,
    position: 'relative',
  },
  
  // Navigation list item
  li: {
    position: 'relative',
    width: 70,
    height: 70,
    zIndex: 1,
  },
  
  // Navigation link
  a: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Icon container
  icon: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 70,
    fontSize: 24, // 1.5em
    textAlign: 'center',
    color: '#222327', // var(--clr)
  },
  
  // Text label
  text: {
    position: 'absolute',
    color: '#222327', // var(--clr)
    fontWeight: '400',
    fontSize: 12, // 0.75em
    letterSpacing: 0.8, // 0.05em
    opacity: 0,
    transform: [{ translateY: 20 }],
  },
  
  // Indicator
  indicator: {
    position: 'absolute',
    top: -35, // -50%
    width: 70,
    height: 70,
    backgroundColor: '#FFA500', // Primary orange color from theme
    borderRadius: 35, // 50%
  },
});

// Animation configuration
export const ANIMATION_CONFIG = {
  duration: 500, // 0.5s exactly like CSS
  easing: 'ease-out',
};

// Color variables
export const COLORS = {
  clr: '#222327',
  background: '#ffffff',
  indicator: '#FFA500', // Primary orange color from theme
}; 