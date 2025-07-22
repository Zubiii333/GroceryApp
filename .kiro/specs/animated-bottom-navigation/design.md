# Design Document

## Overview

The animated magic bottom navigation bar will replace the current Expo Router tabs with a custom React Native component that provides sophisticated animations and visual effects. The design leverages React Native Reanimated for smooth 60fps animations and integrates seamlessly with Expo Router for navigation functionality.

The navigation will feature a floating circular indicator that smoothly transitions between tabs, icons that animate upward when selected, and text labels that fade in/out with smooth transitions. The component will maintain the existing 5-tab structure while adding visual depth through shadows and curved elements.

## Architecture

### Component Structure

```
AnimatedBottomNavigation/
├── AnimatedBottomNavigation.tsx    # Main navigation component
├── NavigationTab.tsx               # Individual tab component
├── FloatingIndicator.tsx           # Animated circular indicator
├── types.ts                        # TypeScript interfaces
└── styles.ts                       # StyleSheet definitions
```

### Integration Approach

The component will replace the current `<Tabs>` component in `app/(tabs)/_layout.tsx` while maintaining compatibility with Expo Router's navigation system. The navigation state will be managed through Expo Router's navigation context, ensuring proper routing and state management.

### Animation Architecture

- **React Native Reanimated 3**: Primary animation library for smooth 60fps animations
- **Shared Values**: For coordinating animations between indicator position and tab states
- **Worklets**: For running animations on the UI thread
- **Spring Animations**: For natural, physics-based transitions

## Components and Interfaces

### AnimatedBottomNavigation Component

**Props Interface:**
```typescript
interface AnimatedBottomNavigationProps {
  tabs: TabConfig[];
  activeIndex: number;
  onTabPress: (index: number, route: string) => void;
  style?: ViewStyle;
}

interface TabConfig {
  id: string;
  route: string;
  icon: React.ComponentType<IconProps>;
  label: string;
  isSpecial?: boolean; // For cart tab styling
}
```

**Key Features:**
- Manages overall navigation state and animations
- Coordinates indicator position with active tab
- Handles tab press events and navigation
- Provides consistent styling and theming

### NavigationTab Component

**Props Interface:**
```typescript
interface NavigationTabProps {
  config: TabConfig;
  isActive: boolean;
  index: number;
  onPress: () => void;
  animatedStyle: AnimatedStyle;
}
```

**Animation States:**
- **Inactive**: Icon at normal position, text hidden (opacity: 0)
- **Active**: Icon translated up by 32px, text visible (opacity: 1)
- **Transition**: Smooth spring animation between states (500ms duration)

### FloatingIndicator Component

**Props Interface:**
```typescript
interface FloatingIndicatorProps {
  activeIndex: number;
  tabWidth: number;
  containerWidth: number;
}
```

**Visual Specifications:**
- **Size**: 70px diameter circle
- **Color**: Tomato (#FF6347) background with theme border
- **Position**: Extends 50% above navigation bar
- **Shadow Elements**: Curved pseudo-elements on left and right sides
- **Animation**: Smooth translateX transition based on active tab

## Data Models

### Navigation State

```typescript
interface NavigationState {
  activeIndex: number;
  tabs: TabConfig[];
  isAnimating: boolean;
}

interface TabConfig {
  id: string;
  route: string;
  icon: React.ComponentType<IconProps>;
  label: string;
  isSpecial?: boolean;
}
```

### Animation Values

```typescript
interface AnimationValues {
  indicatorPosition: SharedValue<number>;
  tabStates: SharedValue<TabAnimationState[]>;
}

interface TabAnimationState {
  iconTranslateY: number;
  textOpacity: number;
  textTranslateY: number;
}
```

## Styling Architecture

### Design System Integration

The component will integrate with the existing design system defined in `constants/theme.ts`:

- **Colors**: Use `colors.primary` for indicator, `colors.background` for navigation background
- **Shadows**: Apply `shadows.large` for floating effect
- **Spacing**: Use `spacing.md` for internal padding
- **Border Radius**: Apply `borderRadius.lg` for navigation container
- **Typography**: Use `typography.styles.caption` for tab labels

### Responsive Design

```typescript
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    ...shadows.large,
  },
  
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  
  indicator: {
    position: 'absolute',
    top: -35, // 50% above container
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF6347',
    borderWidth: 6,
    borderColor: colors.background,
  },
});
```

### Animation Styles

```typescript
const createAnimatedStyles = (animatedValues: AnimationValues) => {
  return {
    indicator: useAnimatedStyle(() => ({
      transform: [
        { translateX: animatedValues.indicatorPosition.value }
      ],
    })),
    
    tabIcon: (index: number) => useAnimatedStyle(() => ({
      transform: [
        { translateY: animatedValues.tabStates.value[index].iconTranslateY }
      ],
    })),
    
    tabText: (index: number) => useAnimatedStyle(() => ({
      opacity: animatedValues.tabStates.value[index].textOpacity,
      transform: [
        { translateY: animatedValues.tabStates.value[index].textTranslateY }
      ],
    })),
  };
};
```

## Error Handling

### Animation Error Recovery

```typescript
const handleAnimationError = (error: Error, context: string) => {
  console.warn(`Animation error in ${context}:`, error);
  // Reset to safe state
  runOnJS(() => {
    setActiveIndex(0);
  })();
};
```

### Navigation Error Handling

```typescript
const handleNavigationError = (route: string, error: Error) => {
  console.error(`Navigation error for route ${route}:`, error);
  // Fallback to home screen
  router.replace('/');
};
```

### Performance Safeguards

- **Animation Interruption**: Cancel ongoing animations when new ones start
- **Memory Management**: Properly cleanup animated values on unmount
- **Frame Dropping**: Use `runOnUI` for heavy calculations

## Testing Strategy

### Unit Tests

```typescript
// NavigationTab.test.tsx
describe('NavigationTab', () => {
  it('should animate icon position when becoming active', () => {
    // Test icon translateY animation
  });
  
  it('should show/hide text label with opacity animation', () => {
    // Test text opacity and position animation
  });
  
  it('should handle press events correctly', () => {
    // Test onPress callback
  });
});
```

### Integration Tests

```typescript
// AnimatedBottomNavigation.test.tsx
describe('AnimatedBottomNavigation', () => {
  it('should navigate to correct route when tab is pressed', () => {
    // Test navigation integration
  });
  
  it('should update indicator position when active tab changes', () => {
    // Test indicator animation
  });
  
  it('should maintain navigation state across re-renders', () => {
    // Test state persistence
  });
});
```

### Animation Tests

```typescript
// Animation.test.tsx
describe('Navigation Animations', () => {
  it('should complete indicator transition within 500ms', () => {
    // Test animation timing
  });
  
  it('should handle rapid tab switching without breaking', () => {
    // Test animation interruption
  });
  
  it('should reset to stable state after animation errors', () => {
    // Test error recovery
  });
});
```

### Visual Regression Tests

- Screenshot comparisons for different animation states
- Cross-platform rendering consistency (iOS/Android)
- Different screen sizes and orientations
- Dark mode compatibility (future consideration)

## Implementation Considerations

### Performance Optimizations

1. **UI Thread Animations**: Use `runOnUI` for all animation calculations
2. **Shared Values**: Minimize JavaScript bridge crossings
3. **Worklet Functions**: Keep animation logic on UI thread
4. **Memoization**: Use `React.memo` for tab components

### Accessibility

1. **Screen Reader Support**: Proper accessibility labels and hints
2. **Touch Targets**: Minimum 44px touch areas
3. **Focus Management**: Keyboard navigation support
4. **Reduced Motion**: Respect system animation preferences

### Cross-Platform Considerations

1. **Shadow Differences**: Different shadow implementations for iOS/Android
2. **Safe Area**: Handle different device safe areas
3. **Performance**: Optimize for both platforms
4. **Visual Consistency**: Ensure identical appearance across platforms

### Migration Strategy

1. **Gradual Replacement**: Replace existing tabs component
2. **Feature Flags**: Allow rollback if issues arise
3. **A/B Testing**: Compare performance with existing navigation
4. **User Feedback**: Monitor user experience metrics