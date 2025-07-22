// Main component exports
export { default as AnimatedBottomNavigation } from './AnimatedBottomNavigation';
export { NavigationTab } from './NavigationTab';
export { default as FloatingIndicator } from './FloatingIndicator';
export { default as AnimationTest } from './AnimationTest';
export { default as CSSMatchTest } from './CSSMatchTest';

// Type exports
export type {
  AnimatedBottomNavigationProps,
  NavigationTabProps,
  FloatingIndicatorProps,
  TabConfig,
  NavigationState,
  TabAnimationState,
  AnimationValues,
  IconProps,
} from './types';

// Style exports
export {
  commonStyles,
  NAVIGATION_HEIGHT,
  INDICATOR_SIZE,
  INDICATOR_OFFSET,
  ICON_TRANSLATE_Y,
  ANIMATION_DURATION,
  COLORS,
} from './styles';