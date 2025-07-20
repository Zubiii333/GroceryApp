/**
 * Design System Exports
 * 
 * This file provides a centralized export for all design system tokens,
 * styles, and utilities to make them easy to import throughout the app.
 */

// Export all design tokens
export {
  colors,
  typography,
  spacing,
  borderRadius,
  dimensions,
  shadows,
  animations,
  opacity,
  default as theme,
} from './theme';

// Export all common styles and utilities
export {
  commonStyles,
  createButtonStyle,
  createTextStyle,
  createSpacing,
  createMargin,
  default as styles,
} from './styles';

// Re-export for convenience
export { default } from './theme';