import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, ArrowLeft, Grid, List } from 'lucide-react-native';
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

const searchSuggestions = [
  'Organic Bananas',
  'Fresh Milk',
  'Whole Wheat Bread',
  'Greek Yogurt',
  'Red Apples',
  'Orange Juice',
  'Chicken Breast',
  'Brown Rice',
];

const mockResults: Product[] = [
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
    id: '5',
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

interface FilterOptions {
  category: string;
  priceRange: [number, number];
  availability: 'all' | 'in_stock' | 'out_of_stock';
  distance: number;
  rating: number;
  sortBy: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'distance';
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    priceRange: [0, 100],
    availability: 'all',
    distance: 10,
    rating: 0,
    sortBy: 'relevance',
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(false);
  };

  const filteredResults = mockResults.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesAvailability = filters.availability === 'all' || 
      (filters.availability === 'in_stock' && product.inStock) ||
      (filters.availability === 'out_of_stock' && !product.inStock);
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesDistance = product.distance <= filters.distance;
    const matchesRating = product.rating >= filters.rating;
    
    return matchesSearch && matchesCategory && matchesAvailability && matchesPrice && matchesDistance && matchesRating;
  });

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setSelectedCategory(newFilters.category);
  };

  const renderSearchSuggestion = (suggestion: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.suggestionItem}
      onPress={() => handleSearch(suggestion)}
    >
      <Search size={16} color="#6B7280" />
      <Text style={styles.suggestionText}>{suggestion}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      layout={viewMode}
      onPress={() => console.log('Product pressed:', item.id)}
      onAddToCart={() => console.log('Add to cart:', item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>Search Products</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.viewToggle}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? (
              <List size={20} color="#000000" />
            ) : (
              <Grid size={20} color="#000000" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, brands..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
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

      {showSuggestions && searchQuery.length === 0 && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Popular Searches</Text>
          {searchSuggestions.map(renderSearchSuggestion)}
        </View>
      )}

      <View style={styles.resultsContainer}>
        {searchQuery.length > 0 && (
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>
              Results for "{searchQuery}"
            </Text>
            <Text style={styles.resultsCount}>
              {filteredResults.length} products found
            </Text>
          </View>
        )}

        <FlatList
          data={filteredResults}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={viewMode === 'grid' ? 2 : 1}
          key={viewMode}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
      </View>

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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewToggle: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  suggestionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  suggestionText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 12,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  productsList: {
    paddingHorizontal: 20,
  },
});