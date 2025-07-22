import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Star, Clock, Bell, Navigation } from 'lucide-react-native';
import ProductCard from '@/components/ProductCard';
import FilterModal from '@/components/FilterModal';
import { colors, spacing, dimensions, borderRadius, shadows, typography } from '@/constants/theme';
import * as Location from 'expo-location';

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
}

interface Shop {
  id: string;
  name: string;
  rating: number;
  distance: number;
  address: string;
  deliveryTime: string;
  image: string;
}

const categories = [
  { id: 'all', name: 'All' },
  { id: 'fruits', name: 'Fruits' },
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'dairy', name: 'Dairy' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'bakery', name: 'Bakery' },
  { id: 'meat', name: 'Meat' },
  { id: 'pantry', name: 'Pantry' },
];

const nearbyShops: Shop[] = [
  {
    id: '1',
    name: 'Fresh Market',
    rating: 4.8,
    distance: 0.5,
    address: '123 Main St',
    deliveryTime: '15-25 min',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    name: 'Green Grocers',
    rating: 4.6,
    distance: 0.8,
    address: '456 Oak Ave',
    deliveryTime: '20-30 min',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    name: 'City Market',
    rating: 4.5,
    distance: 1.2,
    address: '789 Pine Rd',
    deliveryTime: '25-35 min',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 2.99,
    originalPrice: 3.49,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Fresh Market',
    distance: 0.5,
    deliveryTime: '15-25 min',
    inStock: true,
    category: 'fruits',
    discount: 15,
    unit: 'per lb',
    brand: 'Organic Valley',
    productType: ['Organic'],
  },
  {
    id: '2',
    name: 'Fresh Milk',
    price: 4.29,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Green Grocers',
    distance: 0.8,
    deliveryTime: '20-30 min',
    inStock: true,
    category: 'dairy',
    unit: '1 gallon',
    brand: 'Farm Fresh',
    productType: ['Fresh'],
  },
  {
    id: '3',
    name: 'Whole Wheat Bread',
    price: 3.99,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'City Market',
    distance: 1.2,
    deliveryTime: '25-35 min',
    inStock: false,
    category: 'bakery',
    unit: '1 loaf',
    brand: 'Healthy Choice',
    productType: ['Whole Grain'],
  },
  {
    id: '4',
    name: 'Red Apples',
    price: 3.49,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Fresh Market',
    distance: 0.5,
    deliveryTime: '15-25 min',
    inStock: true,
    category: 'fruits',
    unit: 'per lb',
    brand: 'Local Farm',
    productType: ['Fresh'],
  },
  {
    id: '5',
    name: 'Greek Yogurt',
    price: 5.99,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Green Grocers',
    distance: 0.8,
    deliveryTime: '20-30 min',
    inStock: true,
    category: 'dairy',
    unit: '32 oz',
    brand: 'Greek Gods',
    productType: ['Organic', 'Protein'],
  },
  {
    id: '6',
    name: 'Orange Juice',
    price: 4.79,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'City Market',
    distance: 1.2,
    deliveryTime: '25-35 min',
    inStock: true,
    category: 'beverages',
    unit: '64 fl oz',
    brand: 'Tropicana',
    productType: ['Fresh'],
  },
];

interface FilterOptions {
  category: string;
  priceRange: [number, number];
  availability: 'all' | 'in_stock' | 'out_of_stock';
  distance: number;
  rating: number;
  sortBy: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'distance';
}

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    priceRange: [0, 100],
    availability: 'all',
    distance: 10,
    rating: 0,
    sortBy: 'relevance',
  });

  const filteredProducts = featuredProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesAvailability = filters.availability === 'all' || 
      (filters.availability === 'in_stock' && product.inStock) ||
      (filters.availability === 'out_of_stock' && !product.inStock);
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesDistance = product.distance <= filters.distance;
    const matchesRating = product.rating >= filters.rating;
    
    return matchesSearch && matchesCategory && matchesAvailability && matchesPrice && matchesDistance && matchesRating;
  });

  const getCurrentLocation = async () => {
    try {
      setLocationLoading(true);
      
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // Get address from coordinates
      const addressResult = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (addressResult[0]) {
        const formattedAddress = formatAddress(addressResult[0]);
        setCurrentLocation(formattedAddress);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setLocationLoading(false);
    }
  };

  const formatAddress = (addressObj: Location.LocationGeocodedAddress) => {
    const parts = [
      addressObj.name,
      addressObj.street,
      addressObj.city,
      addressObj.region,
    ].filter(Boolean);
    return parts.join(', ');
  };

  // Get location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setSelectedCategory(newFilters.category);
  };

  const renderShopCard = ({ item }: { item: Shop }) => (
    <TouchableOpacity style={styles.shopCard}>
      <Image source={{ uri: item.image }} style={styles.shopImage} />
      <View style={styles.shopContent}>
        <Text style={styles.shopName}>{item.name}</Text>
        <View style={styles.shopDetails}>
          <View style={styles.shopRating}>
            <Star size={12} color={colors.primary} fill={colors.primary} />
            <Text style={styles.shopRatingText}>{item.rating}</Text>
          </View>
          <View style={styles.shopDistance}>
            <MapPin size={12} color={colors.textSecondary} />
            <Text style={styles.shopDistanceText}>{item.distance}km</Text>
          </View>
          <View style={styles.shopDelivery}>
            <Clock size={12} color={colors.textSecondary} />
            <Text style={styles.shopDeliveryText}>{item.deliveryTime}</Text>
          </View>
        </View>
        <Text style={styles.shopAddress}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.text} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Top Section with Black Background */}
        <View style={styles.topSectionContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.userSection}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                style={styles.userAvatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.greeting}>Good morning</Text>
                <Text style={styles.userName}>Jubaeir Islam</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={dimensions.iconLarge} color={colors.textInverse} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          {/* Delivery Location */}
          <View style={styles.deliveryLocationContainer}>
            <View style={styles.locationInfo}>
              <MapPin size={16} color={colors.textInverse} />
              <Text style={styles.deliverToText}> Deliver to</Text>
              <Text style={styles.locationText}>{currentLocation || 'Getting location...'}</Text>
            </View>
            <TouchableOpacity
              style={styles.locationButton}
              onPress={getCurrentLocation}
              disabled={locationLoading}
            >
              <Navigation size={16} color={colors.textInverse} />
            </TouchableOpacity>
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.mainTitle}>What will we{'\n'}order today?</Text>
            <Text style={styles.subtitle}>Fresh groceries delivered to your door</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchSection}>
            <View style={[
              styles.searchContainer,
              isSearchFocused && styles.searchContainerFocused
            ]}>
              <Search size={20} color={colors.textMuted} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search any food"
                placeholderTextColor={colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => setShowFilterModal(true)}
            >
              <Filter size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Content Sections with White Background */}
        <View style={styles.contentContainer}>
          {/* Nearby Shops */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nearby Grocery Shops</Text>
            <FlatList
              data={nearbyShops}
              renderItem={renderShopCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.shopsContainer}
            />
          </View>

          {/* Featured Products */}
          <View style={styles.section}>
            <View style={styles.featuredHeader}>
              <Text style={styles.sectionTitle}>Available Products</Text>
              <Text style={styles.resultsCount}>
                {filteredProducts.length} items found
              </Text>
            </View>
            
            <View style={styles.productsGrid}>
              {filteredProducts.map((product, index) => (
                <View key={product.id} style={styles.gridItem}>
                  <ProductCard
                    product={product}
                    layout="grid"
                    onPress={() => console.log('Product pressed:', product.id)}
                    onAddToCart={() => console.log('Add to cart:', product.id)}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.text, // Black background to fill status bar area
  },

  scrollView: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.background, // White background for content sections
    paddingTop: spacing.lg, // Add padding to ensure rounded corners are visible
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  topSectionContainer: {
    backgroundColor: colors.text, // Black background
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: spacing.xl,
    paddingTop: spacing.xl, // Padding for content
    overflow: 'hidden', // Ensure content doesn't overflow the rounded corners
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: dimensions.avatarSize,
    height: dimensions.avatarSize,
    borderRadius: borderRadius.avatar,
    marginRight: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
  },
  userInfo: {
    flexDirection: 'column',
  },
  greeting: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    color: colors.textInverse, // White text for black background
    lineHeight: typography.lineHeight.tight,
  },
  userName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textInverse,
    lineHeight: typography.lineHeight.normal,
  },
  notificationButton: {
    position: 'relative',
    padding: spacing.xs,
    width: dimensions.touchTarget,
    height: dimensions.touchTarget,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.error,
  },
  deliveryLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationButton: {
    padding: spacing.xs,
  },
  deliverToText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary, // Yellow text
    marginRight: spacing.sm,
  },
  locationText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textInverse, // White text for black background
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing['2xl'],
  },
  mainTitle: {
    ...typography.styles.title,
    marginBottom: spacing.sm,
    color: colors.textInverse, // White text for black background
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.textInverse, // White text for black background
    lineHeight: typography.lineHeight.relaxed,
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.input,
    paddingHorizontal: spacing.lg,
    height: dimensions.inputHeight,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  searchContainerFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
    ...shadows.small,
  },
  searchIcon: {
    marginRight: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.text, // Keep black text for light background search container
  },
  filterButton: {
    width: dimensions.inputHeight,
    height: dimensions.inputHeight,
    borderRadius: borderRadius.input,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    marginBottom: spacing.sm, // Add margin to ensure it doesn't touch the rounded corners
  },
  categoryButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.categoryButton,
    backgroundColor: colors.surface,
    marginRight: spacing.md,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary, // Yellow background for active buttons
  },
  categoryText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary, // Keep gray text for light background category buttons
  },
  categoryTextActive: {
    color: colors.text, // Black text for yellow background
  },
  section: {
    marginBottom: spacing['2xl'],
    backgroundColor: colors.background, // White background for content sections
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    marginTop: spacing.lg,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  resultsCount: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  shopsContainer: {
    paddingHorizontal: spacing.xl,
  },
  shopCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
    marginRight: spacing.lg,
    ...shadows.card,
    width: dimensions.shopCardWidth,
    overflow: 'hidden',
  },
  shopImage: {
    width: '100%',
    height: dimensions.shopImageHeight,
  },
  shopContent: {
    padding: spacing.lg,
  },
  shopName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  shopDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  shopRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  shopRatingText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  shopDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  shopDistanceText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  shopDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopDeliveryText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  shopAddress: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
  },
  productsGrid: {
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  gridItem: {
    width: '48%',
    marginBottom: spacing.md,
  },
});