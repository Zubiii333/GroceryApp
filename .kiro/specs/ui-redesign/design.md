# Design Document

## Overview

This design document outlines the comprehensive UI redesign of the grocery delivery app to follow modern food delivery app patterns. The design will transform the existing interface to match the clean, professional aesthetic shown in the reference UI while maintaining all existing functionality and improving user experience.

## Architecture

### Design System Foundation

The redesign will implement a cohesive design system with:

- **Typography Scale**: Clear hierarchy using system fonts with bold headings and readable body text
- **Color Palette**: Modern color scheme with orange/yellow accent colors (#FFA500) for primary actions
- **Spacing System**: Consistent 8px grid system for margins, padding, and component spacing  
- **Component Library**: Reusable UI components following modern design patterns
- **Elevation System**: Subtle shadows and depth to create visual hierarchy

### Screen Architecture

The app will maintain its existing tab-based navigation structure while updating the visual presentation:

1. **Home Screen**: Primary discovery and search interface
2. **Search Screen**: Dedicated search with advanced filtering
3. **Cart Screen**: Shopping cart management (new/enhanced)
4. **Shops Screen**: Local shop discovery
5. **Profile Screen**: User account management

## Components and Interfaces

### Header Component

**Design Specifications:**
- Clean header with user avatar (40px circular) on the left
- Notification bell icon on the right with red badge indicator
- White background with subtle bottom border
- Height: 60px with proper safe area handling

**Implementation Details:**
- Profile avatar should be clickable for profile actions
- Notification badge should show count when > 0
- Proper spacing and alignment across different screen sizes

### Main Title Component

**Design Specifications:**
- Large, bold typography (32px font size, 700 weight)
- Multi-line support with proper line height (38px)
- Black text color (#000000)
- Positioned prominently below header with 24px bottom margin

**Content Strategy:**
- Primary text: "What will we order today?" (matching reference UI)
- Alternative: "What groceries do you need today?" (current version)

### Search Bar Component

**Design Specifications:**
- Prominent search container with rounded corners (12px border radius)
- Light gray background (#F3F4F6)
- Search icon (20px) with proper spacing
- Height: 50px for easy touch interaction
- Placeholder text: "Search any food" or "Search any product"

**Interactive States:**
- Focus state with subtle border or shadow
- Active typing state with clear text
- Search suggestions dropdown when appropriate

### Category Filter Component

**Design Specifications:**
- Horizontal scrollable pill-shaped buttons
- Inactive state: Light gray background (#F3F4F6), gray text (#6B7280)
- Active state: Black background (#000000), white text (#FFFFFF)
- Rounded corners (20px border radius)
- Proper spacing between items (12px gap)

**Categories:**
- All, Fruits, Vegetables, Dairy, Beverages, Bakery, Meat, Pantry
- Smooth horizontal scrolling with momentum

### Product Card Component

**Design Specifications:**
- Card container: White background, 12px border radius, subtle shadow
- Product image: Full width, 120px height, rounded top corners
- Content padding: 12px all around
- Price typography: 16px, bold (700 weight), black text
- Rating: Star icon + numerical value
- Add button: Circular (28px), green background (#10B981), white plus icon

**Card Layout:**
```
┌─────────────────────┐
│   Product Image     │
├─────────────────────┤
│ Product Name        │
│ Unit/Brand Info     │
│ Shop • Distance     │
│ ⭐ Rating  Time     │
│ $Price    [+]       │
└─────────────────────┘
```

### Featured Product Section

**Design Specifications:**
- Special "Hit of the week" banner with orange/yellow background
- Larger card format for featured items
- Enhanced visual prominence with special styling
- Clear product information with pricing and ratings

### Shopping Cart Component

**Design Specifications:**
- Cart icon in header with item count badge
- Cart screen with item list and quantity controls
- Quantity controls: Circular - and + buttons
- Remove item functionality with clear visual feedback
- Total price calculation and display
- Prominent "Order" button with orange/yellow background

## Data Models

### Enhanced Product Model
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  shop: string;
  distance: number;
  deliveryTime: string;
  inStock: boolean;
  category: string;
  discount?: number;
  unit: string;
  brand: string;
  productType: string[];
  featured?: boolean; // New field for featured products
}
```

### Cart Item Model
```typescript
interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  addedAt: Date;
}

interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  updatedAt: Date;
}
```

### User Interface State
```typescript
interface UIState {
  searchQuery: string;
  selectedCategory: string;
  cartVisible: boolean;
  filterModalVisible: boolean;
  viewMode: 'grid' | 'list';
  loading: boolean;
}
```

## Error Handling

### User Experience Error States

**Network Errors:**
- Graceful fallback with cached data when available
- Clear error messages with retry options
- Loading states with skeleton screens

**Empty States:**
- No search results: Helpful suggestions and alternative searches
- Empty cart: Clear call-to-action to browse products
- No nearby shops: Location troubleshooting guidance

**Validation Errors:**
- Form validation with inline error messages
- Clear guidance on how to fix issues
- Non-blocking error states when possible

## Testing Strategy

### Visual Regression Testing
- Screenshot comparison tests for all major components
- Cross-platform consistency testing (iOS/Android)
- Different screen size and orientation testing

### Interaction Testing
- Touch target size validation (minimum 44px)
- Gesture interaction testing (scrolling, swiping)
- Accessibility testing with screen readers

### Performance Testing
- Image loading and caching performance
- Smooth scrolling and animation performance
- Memory usage optimization for large product lists

### User Experience Testing
- A/B testing for key UI changes
- Usability testing for new cart functionality
- Conversion rate monitoring for design changes

## Implementation Phases

### Phase 1: Core Visual Updates
- Update typography and color scheme
- Redesign header and main title
- Update search bar styling
- Implement new category filter design

### Phase 2: Product Card Redesign
- Redesign product cards with new layout
- Implement featured product section
- Update product grid and list layouts
- Add proper loading and error states

### Phase 3: Cart Implementation
- Build shopping cart functionality
- Implement cart icon with badge
- Create cart management screen
- Add quantity controls and item management

### Phase 4: Polish and Optimization
- Fine-tune animations and transitions
- Optimize performance and loading
- Implement accessibility improvements
- Cross-platform testing and refinement

## Design Tokens

### Colors
```typescript
const colors = {
  primary: '#FFA500',      // Orange accent
  primaryDark: '#FF8C00',  // Darker orange for pressed states
  background: '#FFFFFF',    // White background
  surface: '#F3F4F6',      // Light gray for cards/inputs
  text: '#000000',         // Black primary text
  textSecondary: '#6B7280', // Gray secondary text
  textMuted: '#9CA3AF',    // Light gray muted text
  success: '#10B981',      // Green for add buttons
  error: '#EF4444',        // Red for errors/badges
  border: '#E5E7EB',       // Light gray borders
};
```

### Typography
```typescript
const typography = {
  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 38,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
};
```

### Spacing
```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};
```

This design provides a comprehensive foundation for transforming the grocery delivery app into a modern, professional interface that matches contemporary food delivery app standards while maintaining all existing functionality and improving user experience.