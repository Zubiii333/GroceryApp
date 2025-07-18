import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Switch,
} from 'react-native';
import { X, Check } from 'lucide-react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

interface FilterOptions {
  category: string;
  priceRange: [number, number];
  availability: 'all' | 'in_stock' | 'out_of_stock';
  distance: number;
  rating: number;
  sortBy: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'distance';
}

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'fruits', name: 'Fruits' },
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'dairy', name: 'Dairy Products' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'bakery', name: 'Bakery' },
  { id: 'meat', name: 'Meat & Seafood' },
  { id: 'pantry', name: 'Pantry Staples' },
];

const sortOptions = [
  { id: 'relevance', name: 'Relevance' },
  { id: 'price_low', name: 'Price: Low to High' },
  { id: 'price_high', name: 'Price: High to Low' },
  { id: 'rating', name: 'Customer Rating' },
  { id: 'distance', name: 'Distance' },
];

const priceRanges = [
  { id: 'all', name: 'All Prices', range: [0, 100] },
  { id: 'budget', name: 'Under $5', range: [0, 5] },
  { id: 'mid', name: '$5 - $15', range: [5, 15] },
  { id: 'premium', name: '$15 - $30', range: [15, 30] },
  { id: 'luxury', name: '$30+', range: [30, 100] },
];

export default function FilterModal({ 
  visible, 
  onClose, 
  onApplyFilters, 
  currentFilters 
}: FilterModalProps) {
  const [tempFilters, setTempFilters] = useState<FilterOptions>(currentFilters);

  const handleApplyFilters = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const defaultFilters: FilterOptions = {
      category: 'all',
      priceRange: [0, 100],
      availability: 'all',
      distance: 10,
      rating: 0,
      sortBy: 'relevance',
    };
    setTempFilters(defaultFilters);
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const renderOptionButton = (
    option: { id: string; name: string },
    selectedId: string,
    onSelect: (id: string) => void
  ) => (
    <TouchableOpacity
      key={option.id}
      style={[
        styles.optionButton,
        selectedId === option.id && styles.optionButtonSelected
      ]}
      onPress={() => onSelect(option.id)}
    >
      <Text style={[
        styles.optionText,
        selectedId === option.id && styles.optionTextSelected
      ]}>
        {option.name}
      </Text>
      {selectedId === option.id && (
        <Check size={16} color="#FFFFFF" />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderSection(
            'Category',
            <View style={styles.optionsContainer}>
              {categories.map(category => 
                renderOptionButton(
                  category,
                  tempFilters.category,
                  (id) => setTempFilters({ ...tempFilters, category: id })
                )
              )}
            </View>
          )}

          {renderSection(
            'Price Range',
            <View style={styles.optionsContainer}>
              {priceRanges.map(priceRange => 
                renderOptionButton(
                  priceRange,
                  tempFilters.priceRange[0] === priceRange.range[0] && 
                  tempFilters.priceRange[1] === priceRange.range[1] 
                    ? priceRange.id : '',
                  (id) => {
                    const range = priceRanges.find(p => p.id === id);
                    if (range) {
                      setTempFilters({ 
                        ...tempFilters, 
                        priceRange: range.range as [number, number] 
                      });
                    }
                  }
                )
              )}
            </View>
          )}

          {renderSection(
            'Availability',
            <View style={styles.optionsContainer}>
              {[
                { id: 'all', name: 'All Products' },
                { id: 'in_stock', name: 'In Stock Only' },
                { id: 'out_of_stock', name: 'Out of Stock' },
              ].map(option => 
                renderOptionButton(
                  option,
                  tempFilters.availability,
                  (id) => setTempFilters({ 
                    ...tempFilters, 
                    availability: id as 'all' | 'in_stock' | 'out_of_stock'
                  })
                )
              )}
            </View>
          )}

          {renderSection(
            'Distance',
            <View style={styles.distanceContainer}>
              <Text style={styles.distanceText}>
                Within {tempFilters.distance} km
              </Text>
              <View style={styles.distanceOptions}>
                {[1, 2, 5, 10, 15].map(distance => (
                  <TouchableOpacity
                    key={distance}
                    style={[
                      styles.distanceButton,
                      tempFilters.distance === distance && styles.distanceButtonSelected
                    ]}
                    onPress={() => setTempFilters({ ...tempFilters, distance })}
                  >
                    <Text style={[
                      styles.distanceButtonText,
                      tempFilters.distance === distance && styles.distanceButtonTextSelected
                    ]}>
                      {distance}km
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {renderSection(
            'Minimum Rating',
            <View style={styles.ratingContainer}>
              <View style={styles.ratingOptions}>
                {[0, 3, 3.5, 4, 4.5].map(rating => (
                  <TouchableOpacity
                    key={rating}
                    style={[
                      styles.ratingButton,
                      tempFilters.rating === rating && styles.ratingButtonSelected
                    ]}
                    onPress={() => setTempFilters({ ...tempFilters, rating })}
                  >
                    <Text style={[
                      styles.ratingButtonText,
                      tempFilters.rating === rating && styles.ratingButtonTextSelected
                    ]}>
                      {rating === 0 ? 'Any' : `${rating}+ ⭐`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {renderSection(
            'Sort By',
            <View style={styles.optionsContainer}>
              {sortOptions.map(option => 
                renderOptionButton(
                  option,
                  tempFilters.sortBy,
                  (id) => setTempFilters({ 
                    ...tempFilters, 
                    sortBy: id as FilterOptions['sortBy']
                  })
                )
              )}
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetFilters}
          >
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplyFilters}
          >
            <Text style={styles.applyText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  optionButtonSelected: {
    backgroundColor: '#10B981',
  },
  optionText: {
    fontSize: 14,
    color: '#374151',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  distanceContainer: {
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  distanceOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  distanceButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  distanceButtonSelected: {
    backgroundColor: '#10B981',
  },
  distanceButtonText: {
    fontSize: 12,
    color: '#374151',
  },
  distanceButtonTextSelected: {
    color: '#FFFFFF',
  },
  ratingContainer: {
    alignItems: 'center',
  },
  ratingOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ratingButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  ratingButtonSelected: {
    backgroundColor: '#10B981',
  },
  ratingButtonText: {
    fontSize: 12,
    color: '#374151',
  },
  ratingButtonTextSelected: {
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  resetText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#10B981',
    alignItems: 'center',
  },
  applyText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});