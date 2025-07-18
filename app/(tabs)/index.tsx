import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Star, Plus, Bell } from 'lucide-react-native';
import * as Location from 'expo-location';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  shop: string;
  distance: number;
  deliveryTime: string;
  inStock: boolean;
  category: string;
}

interface Shop {
  id: string;
  name: string;
  rating: number;
  distance: number;
  deliveryTime: string;
  image: string;
}

const categories = [
  { id: 'all', name: 'All', active: true },
  { id: 'fruits', name: 'Fruits', active: false },
  { id: 'vegetables', name: 'Vegetables', active: false },
  { id: 'dairy', name: 'Dairy', active: false },
  { id: 'beverages', name: 'Beverages', active: false },
];

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Organic Bananas',
    price: 3.99,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Green Grocery',
    distance: 0.8,
    deliveryTime: '15-25 min',
    inStock: true,
    category: 'fruits',
  },
  {
    id: '2',
    name: 'Whole Milk (1L)',
    price: 2.50,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Daily Fresh',
    distance: 1.2,
    deliveryTime: '20-30 min',
    inStock: true,
    category: 'dairy',
  },
  {
    id: '3',
    name: 'Mixed Vegetables Pack',
    price: 5.99,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Farm Fresh',
    distance: 0.5,
    deliveryTime: '10-20 min',
    inStock: true,
    category: 'vegetables',
  },
  {
    id: '4',
    name: 'Orange Juice (500ml)',
    price: 4.25,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
    shop: 'Juice Bar',
    distance: 1.5,
    deliveryTime: '25-35 min',
    inStock: false,
    category: 'beverages',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [userAddress, setUserAddress] = useState('Getting location...');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setUserAddress('Location permission denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      const address = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (address[0]) {
        setUserAddress(`${address[0].name || ''} ${address[0].street || ''}, ${address[0].city || ''}`);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setUserAddress('Location unavailable');
    }
  };

  const filteredProducts = featuredProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderProductCard = (product: Product) => (
    <TouchableOpacity key={product.id} style={styles.productCard}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.productDetails}>
          <View style={styles.ratingContainer}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.rating}>{product.rating}</Text>
          </View>
          <Text style={styles.distance}>{product.distance}km • {product.deliveryTime}</Text>
        </View>
        <Text style={styles.shopName}>{product.shop}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        {!product.inStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
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
            <View style={styles.userInfo}>
              <Text style={styles.greeting}>Good morning!</Text>
              <View style={styles.locationContainer}>
                <MapPin size={14} color="#6B7280" />
                <Text style={styles.userAddress} numberOfLines={1}>
                  {userAddress}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Main Title */}
        <Text style={styles.mainTitle}>What will we{'\n'}order today?</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search any grocery"
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

        {/* Featured Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fresh of the week</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {filteredProducts.map(renderProductCard)}
        </View>

        {/* Nearby Shops Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Shops</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.shopsContainer}
        >
          {['Green Grocery', 'Daily Fresh', 'Farm Fresh', 'Juice Bar'].map((shop, index) => (
            <TouchableOpacity key={index} style={styles.shopCard}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                style={styles.shopImage}
              />
              <Text style={styles.shopName}>{shop}</Text>
              <View style={styles.shopInfo}>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.shopRating}>4.{6 + index}</Text>
                <Text style={styles.shopDistance}>• {0.5 + index * 0.3}km</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    flex: 1,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
    flex: 1,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
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
    color: '#374151',
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
    backgroundColor: '#1F2937',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  productsGrid: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  rating: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  distance: {
    fontSize: 12,
    color: '#6B7280',
  },
  shopName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  outOfStockText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  shopsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  shopCard: {
    width: 120,
    marginRight: 16,
    alignItems: 'center',
  },
  shopImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  shopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  shopRating: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  shopDistance: {
    fontSize: 12,
    color: '#6B7280',
  },
});