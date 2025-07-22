import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing
} from 'react-native-reanimated';
import { AnimatedBottomNavigationProps } from './types';

// Direct CSS translation - exact timing and easing
const ANIMATION_CONFIG = {
  duration: 500, // 0.5s exactly like CSS
  easing: Easing.out(Easing.quad),
};

const AnimatedBottomNavigation: React.FC<AnimatedBottomNavigationProps> = ({
  tabs,
  activeIndex,
  onTabPress,
  style,
}) => {
  // Animated values
  const indicatorTranslateX = useSharedValue(activeIndex * 70);

  // Update animations when activeIndex changes
  useEffect(() => {
    indicatorTranslateX.value = withTiming(activeIndex * 70, ANIMATION_CONFIG);
  }, [activeIndex]);

  // Animated style for indicator
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorTranslateX.value }],
  }));

  // Create animated styles for each tab
  const createTabStyles = (index: number) => {
    const isActive = index === activeIndex;
    
    const iconStyle = useAnimatedStyle(() => ({
      transform: [{ 
        translateY: withTiming(isActive ? -32 : 0, ANIMATION_CONFIG)
      }],
    }));

    const textStyle = useAnimatedStyle(() => ({
      opacity: withTiming(isActive ? 1 : 0, ANIMATION_CONFIG),
      transform: [{ 
        translateY: withTiming(isActive ? 10 : 20, ANIMATION_CONFIG)
      }],
    }));

    return { iconStyle, textStyle };
  };

  return (
    <View style={[styles.navigation, style]}>
      <View style={styles.ul}>
        {tabs.map((tab, index) => {
          const IconComponent = tab.icon;
          const { iconStyle, textStyle } = createTabStyles(index);
          
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.li}
              onPress={() => onTabPress(index, tab.route)}
              activeOpacity={1}
            >
              <View style={styles.a}>
                <Animated.View style={[styles.icon, iconStyle]}>
                  <IconComponent size={24} color="#222327" />
                </Animated.View>
                <Animated.Text style={[styles.text, textStyle]}>
                  {tab.label}
                </Animated.Text>
              </View>
            </TouchableOpacity>
          );
        })}
        
        {/* Indicator - exact CSS match */}
        <Animated.View style={[styles.indicator, indicatorStyle]}>
          <View style={[styles.indicatorShadow, styles.indicatorBefore]} />
          <View style={[styles.indicatorShadow, styles.indicatorAfter]} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // .navigation
  navigation: {
    position: 'relative',
    width: 400,
    height: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  
  // .navigation ul
  ul: {
    flexDirection: 'row',
    width: 350,
    position: 'relative',
  },
  
  // .navigation ul li
  li: {
    position: 'relative',
    width: 70,
    height: 70,
    zIndex: 1,
  },
  
  // .navigation ul li a
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
  
  // .navigation ul li a .icon
  icon: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 70,
    fontSize: 24, // 1.5em
    textAlign: 'center',
    color: '#222327',
  },
  
  // .navigation ul li a .text
  text: {
    position: 'absolute',
    color: '#222327',
    fontWeight: '400',
    fontSize: 12, // 0.75em
    letterSpacing: 0.8, // 0.05em
    opacity: 0,
    transform: [{ translateY: 20 }],
  },
  
  // .indicator
  indicator: {
    position: 'absolute',
    top: -35, // -50%
    width: 70,
    height: 70,
    backgroundColor: 'tomato',
    borderRadius: 35, // 50%
    borderWidth: 6,
    borderColor: '#222327',
  },
  
  // Base style for ::before and ::after
  indicatorShadow: {
    position: 'absolute',
    top: 35, // 50%
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
  },
  
  // .indicator::before - simulate box-shadow with background
  indicatorBefore: {
    left: -21,
    borderTopRightRadius: 20,
    backgroundColor: '#222327',
    transform: [{ translateY: -10 }],
  },
  
  // .indicator::after - simulate box-shadow with background
  indicatorAfter: {
    right: -21,
    borderTopLeftRadius: 20,
    backgroundColor: '#222327',
    transform: [{ translateY: -10 }],
  },
});

export default AnimatedBottomNavigation;