import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Star, Clock } from 'lucide-react-native';

interface FilterState {
  category: string;
  priceRange: [number, number];
  availability: string;
  distance: number;
  rating: number;
}

const searchSuggestions = [
  'Fresh Fruits',
  'Organic Vegetables',
  'Dairy Products',
  'Beverages',
  'Snacks',
  'Bakery Items',
];

const mockResults = [
  {
    id: '1',
    name: 'Fresh Organic Apples',
    price: 4.99,
    originalPrice: 5.99,
    rating: 4.8,
    reviews: 120,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Green Valley Market',
    distance: 0.8,
    deliveryTime: '15-25 min',
    inStock: true,
    category: 'fruits',
  },
  {
    id: '2',
    name: 'Organic Spinach Bunch',
    price: 2.49,
    rating: 4.6,
    reviews: 85,
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Farm Fresh Groceries',
    distance: 1.2,
    deliveryTime: '20-30 min',
    inStock: true,
    category: 'vegetables',
  },
  {
    id: '3',
    name: 'Greek Yogurt (500g)',
    price: 3.99,
    rating: 4.7,
    reviews: 95,
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Daily Dairy',
    distance: 0.5,
    deliveryTime: '10-20 min',
    inStock: false,
    category: 'dairy',
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: [0, 50],
    availability: 'all',
    distance: 5,
    rating: 0,
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(false);
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

  const renderProductItem = (product: any) => (
    <TouchableOpacity key={product.id} style={styles.productItem}>
      <Image source={{ uri: product.image }} style={styles.productItemImage} />
      <View style={styles.productItemContent}>
        <Text style={styles.productItemName}>{product.name}</Text>
        <View style={styles.productItemShop}>
          <MapPin size={12} color="#6B7280" />
          <Text style={styles.shopText}>{product.shop}</Text>
          <Text style={styles.distanceText}>• {product.distance}km</Text>
        </View>
        <View style={styles.productItemDetails}>
          <View style={styles.ratingContainer}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewsText}>({product.reviews})</Text>
          </View>
          <View style={styles.deliveryContainer}>
            <Clock size={12} color="#6B7280" />
            <Text style={styles.deliveryText}>{product.deliveryTime}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.productItemPrice}>${product.price}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>${product.originalPrice}</Text>
          )}
          <View style={styles.stockContainer}>
            <View style={[
              styles.stockIndicator,
              { backgroundColor: product.inStock ? '#10B981' : '#EF4444' }
            ]} />
            <Text style={[
              styles.stockText,
              { color: product.inStock ? '#10B981' : '#EF4444' }
            ]}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for groceries..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setShowSuggestions(true)}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {showSuggestions && searchQuery.length === 0 && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Popular Searches</Text>
          {searchSuggestions.map(renderSearchSuggestion)}
        </View>
      )}

      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersTitle}>Filters</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterRow}>
              <TouchableOpacity style={styles.filterTag}>
                <Text style={styles.filterTagText}>Category</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterTag}>
                <Text style={styles.filterTagText}>Price Range</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterTag}>
                <Text style={styles.filterTagText}>Distance</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterTag}>
                <Text style={styles.filterTagText}>Rating</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterTag}>
                <Text style={styles.filterTagText}>Availability</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      <ScrollView style={styles.resultsContainer}>
        {searchQuery.length > 0 && (
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>
              Results for "{searchQuery}"
            </Text>
            <Text style={styles.resultsCount}>
              {mockResults.length} products found
            </Text>
          </View>
        )}

        <View style={styles.productsList}>
          {mockResults.map(renderProductItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
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
    color: '#374151',
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
  suggestionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
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
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  filterTagText: {
    fontSize: 14,
    color: '#6B7280',
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
    color: '#1F2937',
    marginBottom: 4,
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  productsList: {
    paddingHorizontal: 20,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  productItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productItemContent: {
    flex: 1,
  },
  productItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  productItemShop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  shopText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#6B7280',
  },
  productItemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 2,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productItemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  originalPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '500',
  },
});