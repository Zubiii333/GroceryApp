import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Star, Clock, Phone, Navigation, Filter } from 'lucide-react-native';

interface Shop {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distance: number;
  address: string;
  phone: string;
  deliveryTime: string;
  image: string;
  categories: string[];
  isOpen: boolean;
  openHours: string;
  productCount: number;
}

const nearbyShops: Shop[] = [
  {
    id: '1',
    name: 'Fresh Market',
    rating: 4.8,
    reviewCount: 324,
    distance: 0.5,
    address: '123 Main Street, Downtown',
    phone: '+1 (555) 123-4567',
    deliveryTime: '15-25 min',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400',
    categories: ['Organic', 'Fresh Produce', 'Dairy'],
    isOpen: true,
    openHours: '7:00 AM - 10:00 PM',
    productCount: 1250,
  },
  {
    id: '2',
    name: 'Green Grocers',
    rating: 4.6,
    reviewCount: 189,
    distance: 0.8,
    address: '456 Oak Avenue, Midtown',
    phone: '+1 (555) 234-5678',
    deliveryTime: '20-30 min',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
    categories: ['Organic', 'Local', 'Vegetables'],
    isOpen: true,
    openHours: '6:00 AM - 11:00 PM',
    productCount: 890,
  },
  {
    id: '3',
    name: 'City Market',
    rating: 4.5,
    reviewCount: 267,
    distance: 1.2,
    address: '789 Pine Road, Uptown',
    phone: '+1 (555) 345-6789',
    deliveryTime: '25-35 min',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
    categories: ['Supermarket', 'Bulk', 'International'],
    isOpen: false,
    openHours: '8:00 AM - 9:00 PM',
    productCount: 2100,
  },
  {
    id: '4',
    name: 'Corner Store Plus',
    rating: 4.3,
    reviewCount: 156,
    distance: 1.5,
    address: '321 Elm Street, Westside',
    phone: '+1 (555) 456-7890',
    deliveryTime: '30-40 min',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400',
    categories: ['Convenience', 'Snacks', 'Beverages'],
    isOpen: true,
    openHours: '24/7',
    productCount: 450,
  },
  {
    id: '5',
    name: 'Organic Haven',
    rating: 4.9,
    reviewCount: 98,
    distance: 2.1,
    address: '654 Maple Drive, Eastside',
    phone: '+1 (555) 567-8901',
    deliveryTime: '35-45 min',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
    categories: ['Organic', 'Health Food', 'Vegan'],
    isOpen: true,
    openHours: '9:00 AM - 8:00 PM',
    productCount: 680,
  },
];

const filterOptions = [
  { id: 'all', name: 'All Shops' },
  { id: 'open', name: 'Open Now' },
  { id: 'organic', name: 'Organic' },
  { id: 'nearby', name: 'Under 1km' },
];

export default function ShopsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredShops = nearbyShops.filter(shop => {
    switch (selectedFilter) {
      case 'open':
        return shop.isOpen;
      case 'organic':
        return shop.categories.includes('Organic');
      case 'nearby':
        return shop.distance < 1;
      default:
        return true;
    }
  });

  const renderShopCard = ({ item }: { item: Shop }) => (
    <TouchableOpacity style={styles.shopCard}>
      <Image source={{ uri: item.image }} style={styles.shopImage} />
      
      <View style={styles.shopContent}>
        <View style={styles.shopHeader}>
          <Text style={styles.shopName}>{item.name}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: item.isOpen ? '#10B981' : '#EF4444' }
          ]}>
            <Text style={styles.statusText}>
              {item.isOpen ? 'Open' : 'Closed'}
            </Text>
          </View>
        </View>

        <View style={styles.shopRating}>
          <Star size={14} color="#FFA500" fill="#FFA500" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewText}>({item.reviewCount} reviews)</Text>
        </View>

        <View style={styles.shopDetails}>
          <View style={styles.detailRow}>
            <MapPin size={12} color="#6B7280" />
            <Text style={styles.detailText}>{item.address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Clock size={12} color="#6B7280" />
            <Text style={styles.detailText}>{item.openHours}</Text>
          </View>
          <View style={styles.detailRow}>
            <Navigation size={12} color="#6B7280" />
            <Text style={styles.detailText}>{item.distance}km • {item.deliveryTime}</Text>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          {item.categories.slice(0, 3).map((category, index) => (
            <View key={index} style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>{category}</Text>
            </View>
          ))}
        </View>

        <View style={styles.shopFooter}>
          <Text style={styles.productCount}>
            {item.productCount} products available
          </Text>
          <TouchableOpacity style={styles.callButton}>
            <Phone size={16} color="#10B981" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Shops</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {filterOptions.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterTab,
              selectedFilter === filter.id && styles.filterTabActive
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={[
              styles.filterTabText,
              selectedFilter === filter.id && styles.filterTabTextActive
            ]}>
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredShops.length} shops found
        </Text>
      </View>

      <FlatList
        data={filteredShops}
        renderItem={renderShopCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.shopsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  filterTabActive: {
    backgroundColor: '#000000',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  resultsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  shopsList: {
    padding: 20,
  },
  shopCard: {
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
    overflow: 'hidden',
  },
  shopImage: {
    width: '100%',
    height: 160,
  },
  shopContent: {
    padding: 16,
  },
  shopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  shopName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  shopRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  shopDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  categoryTagText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
  },
  shopFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  callButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});