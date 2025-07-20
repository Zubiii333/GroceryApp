# Design System

This directory contains the design system foundation for the grocery delivery app, including design tokens, common styles, and utility functions.

## Files

- `theme.ts` - Core design tokens (colors, typography, spacing, etc.)
- `styles.ts` - Common style patterns and utility functions
- `index.ts` - Centralized exports for easy importing

## Usage

### Importing Design Tokens

```typescript
// Import specific tokens
import { colors, typography, spacing } from '@/constants';

// Import all tokens as theme object
import theme from '@/constants';

// Import common styles
import { commonStyles } from '@/constants';
```

### Using Colors

```typescript
import { colors } from '@/constants';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,        // Orange accent
    color: colors.textInverse,             // White text
  },
  text: {
    color: colors.text,                    // Black text
  },
  secondaryText: {
    color: colors.textSecondary,           // Gray text
  },
});
```

### Using Typography

```typescript
import { typography } from '@/constants';

const styles = StyleSheet.create({
  title: {
    ...typography.styles.title,            // 32px, bold, proper line height
  },
  heading: {
    ...typography.styles.heading,          // 20px, semibold
  },
  body: {
    ...typography.styles.body,             // 16px, normal
  },
});
```

### Using Spacing

```typescript
import { spacing } from '@/constants';

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,                   // 16px
    marginBottom: spacing['2xl'],          // 24px
  },
});
```

### Using Common Styles

```typescript
import { commonStyles } from '@/constants';

// Use pre-defined common styles
<View style={commonStyles.container}>
  <Text style={commonStyles.titleText}>Title</Text>
  <TouchableOpacity style={commonStyles.buttonPrimary}>
    <Text style={commonStyles.buttonText}>Button</Text>
  </TouchableOpacity>
</View>
```

### Using Utility Functions

```typescript
import { createButtonStyle, createTextStyle } from '@/constants';

// Create dynamic button styles
const primaryButton = createButtonStyle('primary');
const secondaryButton = createButtonStyle('secondary');

// Create text styles
const titleStyle = createTextStyle('title');
```

## Design Tokens Reference

### Colors

- **Primary**: `#FFA500` (Orange accent)
- **Background**: `#FFFFFF` (White)
- **Surface**: `#F3F4F6` (Light gray for cards/inputs)
- **Text**: `#000000` (Black primary text)
- **Text Secondary**: `#6B7280` (Gray secondary text)
- **Success**: `#10B981` (Green for add buttons)
- **Error**: `#EF4444` (Red for errors/badges)

### Typography Scale

- **Title**: 32px, bold (700)
- **Heading**: 20px, semibold (600)
- **Body**: 16px, normal (400)
- **Small**: 14px, normal (400)
- **Caption**: 12px, normal (400)

### Spacing Scale (8px grid)

- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **lg**: 16px
- **xl**: 20px
- **2xl**: 24px
- **3xl**: 28px
- **4xl**: 32px

### Component Dimensions

- **Header Height**: 60px
- **Avatar Size**: 40px
- **Button Height**: 50px
- **Input Height**: 50px
- **Touch Target**: 44px (minimum for accessibility)

## Best Practices

1. **Always use design tokens** instead of hardcoded values
2. **Use common styles** when available to maintain consistency
3. **Follow the 8px spacing grid** for margins and padding
4. **Use semantic color names** (e.g., `colors.primary` instead of `#FFA500`)
5. **Leverage typography styles** for consistent text rendering
6. **Test touch targets** to ensure they meet the 44px minimum requirement

## Examples

### Header Component

```typescript
import { commonStyles, colors, spacing } from '@/constants';

const HeaderComponent = () => (
  <View style={commonStyles.header}>
    <Image style={commonStyles.avatar} source={avatarSource} />
    <TouchableOpacity style={styles.notificationButton}>
      <Bell size={24} color={colors.text} />
      <View style={commonStyles.notificationBadge} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  notificationButton: {
    position: 'relative',
    padding: spacing.xs,
  },
});
```

### Product Card

```typescript
import { commonStyles, colors, typography, spacing } from '@/constants';

const ProductCard = () => (
  <View style={commonStyles.card}>
    <Image style={styles.productImage} source={imageSource} />
    <View style={commonStyles.cardContent}>
      <Text style={commonStyles.bodyText}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Plus size={16} color={colors.textInverse} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  price: {
    ...typography.styles.body,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  addButton: {
    ...commonStyles.buttonCircular,
    ...commonStyles.buttonCircularPrimary,
  },
});
```