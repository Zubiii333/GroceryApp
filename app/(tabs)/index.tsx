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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Star, Clock, Bell, Plus } from 'lucide-react-native';
import LocationService from '@/components/LocationService';
import ProductCard from '@/components/ProductCard';
import FilterModal from '@/components/FilterModal';

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
  const [currentLocation, setCurrentLocation] = useState<string>('');
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

  const handleLocationUpdate = (location: any) => {
    console.log('Location updated:', location);
  };

  const handleAddressUpdate = (address: string) => {
    setCurrentLocation(address);
  };

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
            <Star size={12} color="#FFA500" fill="#FFA500" />
            <Text style={styles.shopRatingText}>{item.rating}</Text>
          </View>
          <View style={styles.shopDistance}>
            <MapPin size={12} color="#6B7280" />
            <Text style={styles.shopDistanceText}>{item.distance}km</Text>
          </View>
          <View style={styles.shopDelivery}>
            <Clock size={12} color="#6B7280" />
            <Text style={styles.shopDeliveryText}>{item.deliveryTime}</Text>
          </View>
        </View>
        <Text style={styles.shopAddress}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userSection}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100' }}
              style={styles.userAvatar}
            />
            <TouchableOpacity style={styles.addButton}>
              <Plus size={16} color="#000000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#000000" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Location Service */}
        <LocationService 
          onLocationUpdate={handleLocationUpdate}
          onAddressUpdate={handleAddressUpdate}
        />

        {/* Main Title */}
        <Text style={styles.mainTitle}>What groceries{'\n'}do you need today?</Text>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search any product"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Filter size={20} color="#000000" />
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
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                layout="grid"
                onPress={() => console.log('Product pressed:', product.id)}
                onAddToCart={() => console.log('Add to cart:', product.id)}
              />
            ))}
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    paddingHorizontal: 20,
    marginBottom: 24,
    lineHeight: 38,
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#000000',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  shopsContainer: {
    paddingHorizontal: 20,
  },
  shopCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: 280,
    overflow: 'hidden',
  },
  shopImage: {
    width: '100%',
    height: 120,
  },
  shopContent: {
    padding: 16,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  shopDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  shopRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  shopRatingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  shopDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  shopDistanceText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  shopDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopDeliveryText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  shopAddress: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  productsGrid: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});