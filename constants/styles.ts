/**
 * Common Style Utilities
 * 
 * This file provides reusable style patterns and utility functions
 * that use the design tokens from theme.ts
 */

import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, dimensions, shadows } from './theme';

// Common component styles that can be reused across the app
export const commonStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
    backgroundColor: colors.background,
    height: dimensions.headerHeight,
  },
  
  // Avatar styles
  avatar: {
    width: dimensions.avatarSize,
    height: dimensions.avatarSize,
    borderRadius: borderRadius.avatar,
  },
  
  avatarSmall: {
    width: dimensions.avatarSmall,
    height: dimensions.avatarSmall,
    borderRadius: dimensions.avatarSmall / 2,
  },
  
  // Button styles
  button: {
    height: dimensions.buttonHeight,
    borderRadius: borderRadius.button,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  
  buttonPrimary: {
    backgroundColor: colors.primary,
    ...shadows.button,
  },
  
  buttonSecondary: {
    backgroundColor: colors.surface,
    ...shadows.button,
  },
  
  buttonSmall: {
    height: dimensions.buttonSmall,
    paddingHorizontal: spacing.md,
  },
  
  // Circular button (for add to cart, etc.)
  buttonCircular: {
    width: dimensions.avatarSmall,
    height: dimensions.avatarSmall,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  buttonCircularPrimary: {
    backgroundColor: colors.success,
  },
  
  // Input styles
  input: {
    height: dimensions.inputHeight,
    borderRadius: borderRadius.input,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    fontSize: typography.fontSize.base,
    color: colors.text,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.input,
    paddingHorizontal: spacing.lg,
    height: dimensions.inputHeight,
  },
  
  // Search bar specific styles
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.input,
    paddingHorizontal: spacing.lg,
    height: dimensions.inputHeight,
  },
  
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.text,
  },
  
  // Card styles
  card: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.card,
    ...shadows.card,
  },
  
  cardContent: {
    padding: spacing.md,
  },
  
  // Category button styles
  categoryButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.categoryButton,
    backgroundColor: colors.surface,
    marginRight: spacing.md,
  },
  
  categoryButtonActive: {
    backgroundColor: colors.text,
  },
  
  // Badge styles
  badge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.error,
  },
  
  // Notification badge
  notificationBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.error,
  },
  
  // Section styles
  section: {
    marginBottom: spacing['2xl'],
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  
  // Grid styles
  grid: {
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  gridItem: {
    width: dimensions.productCardWidth,
    marginBottom: spacing.lg,
  },
  
  // List styles
  horizontalList: {
    paddingHorizontal: spacing.xl,
  },
  
  // Spacing utilities
  marginTop: {
    marginTop: spacing.lg,
  },
  
  marginBottom: {
    marginBottom: spacing.lg,
  },
  
  paddingHorizontal: {
    paddingHorizontal: spacing.xl,
  },
  
  paddingVertical: {
    paddingVertical: spacing.lg,
  },
  
  // Text styles (using typography tokens)
  titleText: {
    ...typography.styles.title,
  },
  
  headingText: {
    ...typography.styles.heading,
  },
  
  bodyText: {
    ...typography.styles.body,
  },
  
  bodySecondaryText: {
    ...typography.styles.bodySecondary,
  },
  
  smallText: {
    ...typography.styles.small,
  },
  
  captionText: {
    ...typography.styles.caption,
  },
  
  buttonText: {
    ...typography.styles.button,
  },
  
  categoryButtonText: {
    ...typography.styles.categoryButton,
  },
  
  categoryButtonActiveText: {
    ...typography.styles.categoryButtonActive,
  },
  
  // Center alignment
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Flex utilities
  row: {
    flexDirection: 'row',
  },
  
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  flex1: {
    flex: 1,
  },
});

// Utility functions for creating dynamic styles
export const createButtonStyle = (variant: 'primary' | 'secondary' | 'success' = 'primary') => {
  const baseStyle = commonStyles.button;
  
  switch (variant) {
    case 'primary':
      return [baseStyle, commonStyles.buttonPrimary];
    case 'secondary':
      return [baseStyle, commonStyles.buttonSecondary];
    case 'success':
      return [baseStyle, { backgroundColor: colors.success }];
    default:
      return [baseStyle, commonStyles.buttonPrimary];
  }
};

export const createTextStyle = (variant: keyof typeof typography.styles) => {
  return typography.styles[variant];
};

// Helper function to create consistent spacing
export const createSpacing = (
  top: keyof typeof spacing | number = 0, 
  right: keyof typeof spacing | number = 0, 
  bottom: keyof typeof spacing | number = 0, 
  left: keyof typeof spacing | number = 0
) => ({
  paddingTop: typeof top === 'string' ? spacing[top] : top,
  paddingRight: typeof right === 'string' ? spacing[right] : right,
  paddingBottom: typeof bottom === 'string' ? spacing[bottom] : bottom,
  paddingLeft: typeof left === 'string' ? spacing[left] : left,
});

// Helper function to create consistent margins
export const createMargin = (
  top: keyof typeof spacing | number = 0, 
  right: keyof typeof spacing | number = 0, 
  bottom: keyof typeof spacing | number = 0, 
  left: keyof typeof spacing | number = 0
) => ({
  marginTop: typeof top === 'string' ? spacing[top] : top,
  marginRight: typeof right === 'string' ? spacing[right] : right,
  marginBottom: typeof bottom === 'string' ? spacing[bottom] : bottom,
  marginLeft: typeof left === 'string' ? spacing[left] : left,
});

export default commonStyles;