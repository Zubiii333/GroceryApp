/**
 * Design System Foundation
 * 
 * This file contains all design tokens including colors, typography, spacing,
 * and other design constants that match the reference UI design.
 */

// Color Palette
export const colors = {
  // Primary Colors
  primary: '#FFA500',        // Orange accent color
  primaryDark: '#FF8C00',    // Darker orange for pressed states
  primaryLight: '#FFB84D',   // Lighter orange for hover states
  
  // Background Colors
  background: '#FFFFFF',      // White background
  surface: '#F3F4F6',        // Light gray for cards/inputs
  surfaceDark: '#E5E7EB',    // Darker gray for borders
  
  // Text Colors
  text: '#000000',           // Black primary text
  textSecondary: '#6B7280',  // Gray secondary text
  textMuted: '#9CA3AF',      // Light gray muted text
  textInverse: '#FFFFFF',    // White text for dark backgrounds
  
  // Status Colors
  success: '#10B981',        // Green for add buttons and success states
  successDark: '#059669',    // Darker green for pressed states
  error: '#EF4444',          // Red for errors and badges
  errorDark: '#DC2626',      // Darker red for pressed states
  warning: '#F59E0B',        // Yellow/amber for warnings
  info: '#3B82F6',           // Blue for informational states
  
  // Border Colors
  border: '#E5E7EB',         // Light gray borders
  borderDark: '#D1D5DB',     // Darker gray borders
  
  // Shadow Colors
  shadow: '#000000',         // Black for shadows
  shadowLight: 'rgba(0, 0, 0, 0.1)', // Light shadow
  shadowMedium: 'rgba(0, 0, 0, 0.15)', // Medium shadow
  shadowDark: 'rgba(0, 0, 0, 0.25)',   // Dark shadow
} as const;

// Typography Scale
export const typography = {
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    '6xl': 48,
  },
  
  // Font Weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Line Heights
  lineHeight: {
    tight: 16,
    normal: 20,
    relaxed: 24,
    loose: 28,
    extraLoose: 32,
    title: 38,
  },
  
  // Typography Styles
  styles: {
    // Main title style
    title: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 38,
      color: colors.text,
    },
    
    // Section headings
    heading: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 24,
      color: colors.text,
    },
    
    // Subheadings
    subheading: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 22,
      color: colors.text,
    },
    
    // Body text
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 20,
      color: colors.text,
    },
    
    // Secondary body text
    bodySecondary: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 20,
      color: colors.textSecondary,
    },
    
    // Small text
    small: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 18,
      color: colors.textSecondary,
    },
    
    // Caption text
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
      color: colors.textMuted,
    },
    
    // Button text
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 20,
      color: colors.textInverse,
    },
    
    // Category button text
    categoryButton: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 18,
      color: colors.textSecondary,
    },
    
    // Category button active text
    categoryButtonActive: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 18,
      color: colors.textInverse,
    },
  },
} as const;

// Spacing System (8px grid)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
  '6xl': 48,
  '7xl': 56,
  '8xl': 64,
} as const;

// Border Radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999, // For circular elements
  
  // Specific component radii
  button: 12,
  card: 12,
  input: 12,
  categoryButton: 20,
  avatar: 20, // For 40px avatar (half of width/height)
} as const;

// Component Dimensions
export const dimensions = {
  // Header
  headerHeight: 60,
  
  // Avatar
  avatarSize: 40,
  avatarSmall: 28,
  avatarLarge: 56,
  
  // Buttons
  buttonHeight: 50,
  buttonSmall: 36,
  buttonLarge: 56,
  
  // Input fields
  inputHeight: 50,
  
  // Icons
  iconSmall: 16,
  iconMedium: 20,
  iconLarge: 24,
  iconXLarge: 32,
  
  // Product cards
  productCardWidth: '48%', // For 2-column grid with spacing
  productImageHeight: 120,
  
  // Shop cards
  shopCardWidth: 280,
  shopImageHeight: 120,
  
  // Touch targets (minimum 44px for accessibility)
  touchTarget: 44,
} as const;

// Shadow Styles
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  
  // Component-specific shadows
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  button: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
} as const;

// Animation Durations
export const animations = {
  fast: 150,
  normal: 250,
  slow: 350,
  slower: 500,
} as const;

// Opacity Values
export const opacity = {
  disabled: 0.5,
  pressed: 0.8,
  overlay: 0.6,
  subtle: 0.1,
} as const;

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  dimensions,
  shadows,
  animations,
  opacity,
};