import { ViewStyle, TextStyle } from 'react-native';
import { SharedValue, AnimatedStyle } from 'react-native-reanimated';

// Icon props interface for Lucide React Native icons
export interface IconProps {
  size?: number;
  color?: string;
}

// Tab configuration interface
export interface TabConfig {
  id: string;
  route: string;
  icon: React.ComponentType<IconProps>;
  label: string;
  isSpecial?: boolean; // For cart tab styling
}

// Main navigation component props
export interface AnimatedBottomNavigationProps {
  tabs: TabConfig[];
  activeIndex: number;
  onTabPress: (index: number, route: string) => void;
  style?: ViewStyle;
}

// Individual tab component props
export interface NavigationTabProps {
  config: TabConfig;
  isActive: boolean;
  index: number;
  onPress: () => void;
  animatedStyle: {
    icon: AnimatedStyle<ViewStyle>;
    text: AnimatedStyle<TextStyle>;
  };
}

// Floating indicator component props
export interface FloatingIndicatorProps {
  activeIndex: number;
  tabWidth: number;
  containerWidth: number;
  animatedStyle: AnimatedStyle<ViewStyle>;
}

// Navigation state interface
export interface NavigationState {
  activeIndex: number;
  tabs: TabConfig[];
  isAnimating: boolean;
}

// Animation state for individual tabs
export interface TabAnimationState {
  iconTranslateY: number;
  textOpacity: number;
  textTranslateY: number;
}

// Animation values interface
export interface AnimationValues {
  indicatorPosition: SharedValue<number>;
  tabStates: SharedValue<TabAnimationState[]>;
}