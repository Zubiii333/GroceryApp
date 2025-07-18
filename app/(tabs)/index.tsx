import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Bell } from 'lucide-react-native';
import * as Location from 'expo-location';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  shop: string;
  distance: number;
  deliveryTime: string;
  inStock: boolean;
  category: string;
  weight?: string;
}

const categories = [
  { id: 'all', name: 'All' },
  { id: 'burgers', name: 'Burgers' },
  { id: 'lunch', name: 'Lunch' },
  { id: 'chicken', name: 'Chicken' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'asian', name: 'Asian' },
];

const featuredProducts: Product[] = [
  {
    id: '1',
    name: "Burger butcher's daughter",
    price: 6.30,
    rating: 9.8,
    reviews: 124,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Burger House',
    distance: 0.8,
    deliveryTime: '15-25 min',
    inStock: true,
    category: 'burgers',
  },
  {
    id: '2',
    name: 'Burger Farsh',
    price: 7.00,
    rating: 9.5,
    reviews: 87,
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Farsh Kitchen',
    distance: 1.2,
    deliveryTime: '20-30 min',
    inStock: true,
    category: 'burgers',
  },
  {
    id: '3',
    name: 'Chicken burger',
    price: 5.30,
    rating: 9.1,
    reviews: 156,
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Chicken Corner',
    distance: 0.5,
    deliveryTime: '10-20 min',
    inStock: true,
    category: 'chicken',
  },
  {
    id: '4',
    name: 'Burger Corporate',
    price: 8.50,
    rating: 7.1,
    reviews: 203,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Corporate Eats',
    distance: 1.5,
    deliveryTime: '25-35 min',
    inStock: true,
    category: 'burgers',
  },
  {
    id: '5',
    name: 'Burger Blue Cheese',
    price: 9.20,
    rating: 8.5,
    reviews: 98,
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Gourmet Burgers',
    distance: 2.1,
    deliveryTime: '30-40 min',
    inStock: true,
    category: 'burgers',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const filteredProducts = featuredProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderFeaturedProduct = (product: Product) => (
    <TouchableOpacity key={product.id} style={styles.featuredCard}>
      <Image source={{ uri: product.image }} style={styles.featuredImage} />
      <View style={styles.featuredContent}>
        <Text style={styles.featuredName}>{product.name}</Text>
        <View style={styles.featuredRating}>
          <Text style={styles.ratingText}>⭐ {product.rating}</Text>
          <Text style={styles.reviewsText}>({product.reviews})</Text>
        </View>
        <Text style={styles.featuredPrice}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderProductGrid = (product: Product) => (
    <TouchableOpacity key={product.id} style={styles.gridCard}>
      <Image source={{ uri: product.image }} style={styles.gridImage} />
      <View style={styles.gridContent}>
        <Text style={styles.gridName}>{product.name}</Text>
        <View style={styles.gridRating}>
          <Text style={styles.gridRatingText}>⭐ {product.rating}</Text>
          <Text style={styles.gridReviewsText}>({product.reviews})</Text>
        </View>
        <Text style={styles.gridPrice}>${product.price.toFixed(2)}</Text>
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

        {/* Main Title */}
        <Text style={styles.mainTitle}>What will we{'\n'}order today?</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search any food"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
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

        {/* Hit of the week */}
        <View style={styles.sectionContainer}>
          <View style={styles.hitOfWeekHeader}>
            <Text style={styles.hitOfWeekTitle}>Hit of the week</Text>
          </View>
          
          {filteredProducts.length > 0 && (
            <TouchableOpacity style={styles.hitOfWeekCard}>
              <Image 
                source={{ uri: filteredProducts[0].image }} 
                style={styles.hitOfWeekImage} 
              />
              <View style={styles.hitOfWeekContent}>
                <Text style={styles.hitOfWeekName}>{filteredProducts[0].name}</Text>
                <View style={styles.hitOfWeekRating}>
                  <Text style={styles.hitRatingText}>⭐ {filteredProducts[0].rating}</Text>
                </View>
                <Text style={styles.hitOfWeekPrice}>${filteredProducts[0].price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {filteredProducts.slice(1).map(renderProductGrid)}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
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
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  hitOfWeekHeader: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  hitOfWeekTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  hitOfWeekCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  hitOfWeekImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  hitOfWeekContent: {
    flex: 1,
    justifyContent: 'center',
  },
  hitOfWeekName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  hitOfWeekRating: {
    marginBottom: 8,
  },
  hitRatingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  hitOfWeekPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  productsGrid: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gridImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  gridContent: {
    padding: 12,
  },
  gridName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  gridRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridRatingText: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 4,
  },
  gridReviewsText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  gridPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  featuredCard: {
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
    width: 200,
  },
  featuredImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  featuredContent: {
    padding: 12,
  },
  featuredName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  featuredRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
});