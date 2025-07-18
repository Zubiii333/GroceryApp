import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star, Plus, Clock, MapPin } from 'lucide-react-native';

interface ProductCardProps {
  product: {
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
  };
  onPress?: () => void;
  onAddToCart?: () => void;
  layout?: 'grid' | 'list';
}

export default function ProductCard({ 
  product, 
  onPress, 
  onAddToCart,
  layout = 'grid' 
}: ProductCardProps) {
  const handleAddToCart = () => {
    if (product.inStock) {
      onAddToCart?.();
    }
  };

  if (layout === 'list') {
    return (
      <TouchableOpacity style={styles.listCard} onPress={onPress}>
        <Image source={{ uri: product.image }} style={styles.listImage} />
        <View style={styles.listContent}>
          <Text style={styles.listProductName}>{product.name}</Text>
          <View style={styles.listShopInfo}>
            <MapPin size={12} color="#6B7280" />
            <Text style={styles.listShopName}>{product.shop}</Text>
            <Text style={styles.listDistance}>• {product.distance}km</Text>
          </View>
          <View style={styles.listDetails}>
            <View style={styles.listRating}>
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.listRatingText}>{product.rating}</Text>
            </View>
            <View style={styles.listDelivery}>
              <Clock size={12} color="#6B7280" />
              <Text style={styles.listDeliveryText}>{product.deliveryTime}</Text>
            </View>
          </View>
          <View style={styles.listPriceContainer}>
            <View style={styles.listPrices}>
              <Text style={styles.listPrice}>${product.price.toFixed(2)}</Text>
              {product.originalPrice && (
                <Text style={styles.listOriginalPrice}>
                  ${product.originalPrice.toFixed(2)}
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={[
                styles.listAddButton,
                !product.inStock && styles.listAddButtonDisabled
              ]}
              onPress={handleAddToCart}
              disabled={!product.inStock}
            >
              <Plus size={16} color={product.inStock ? '#FFFFFF' : '#9CA3AF'} />
            </TouchableOpacity>
          </View>
        </View>
        {!product.inStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.gridCard} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.gridImage} />
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}
        {!product.inStock && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>
      
      <View style={styles.gridContent}>
        <Text style={styles.gridProductName} numberOfLines={2}>{product.name}</Text>
        
        <View style={styles.gridShopInfo}>
          <MapPin size={10} color="#6B7280" />
          <Text style={styles.gridShopName} numberOfLines={1}>
            {product.shop}
          </Text>
        </View>
        
        <View style={styles.gridDetails}>
          <View style={styles.gridRating}>
            <Star size={10} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.gridRatingText}>{product.rating}</Text>
          </View>
          <Text style={styles.gridDistance}>{product.distance}km</Text>
        </View>
        
        <View style={styles.gridFooter}>
          <View style={styles.gridPrices}>
            <Text style={styles.gridPrice}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.gridOriginalPrice}>
                ${product.originalPrice.toFixed(2)}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.gridAddButton,
              !product.inStock && styles.gridAddButtonDisabled
            ]}
            onPress={handleAddToCart}
            disabled={!product.inStock}
          >
            <Plus size={14} color={product.inStock ? '#FFFFFF' : '#9CA3AF'} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Grid Layout Styles
  gridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
  imageContainer: {
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: 120,
  },
  gridContent: {
    padding: 12,
  },
  gridProductName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 18,
  },
  gridShopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  gridShopName: {
    fontSize: 11,
    color: '#6B7280',
    marginLeft: 4,
    flex: 1,
  },
  gridDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  gridRatingText: {
    fontSize: 10,
    color: '#6B7280',
    marginLeft: 2,
  },
  gridDistance: {
    fontSize: 10,
    color: '#6B7280',
  },
  gridFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gridPrices: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  gridOriginalPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: 4,
  },
  gridAddButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridAddButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },

  // List Layout Styles
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
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
  listImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  listContent: {
    flex: 1,
  },
  listProductName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  listShopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  listShopName: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  listDistance: {
    fontSize: 12,
    color: '#6B7280',
  },
  listDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  listRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  listRatingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
  listDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listDeliveryText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
  listPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listPrices: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  listOriginalPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  listAddButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listAddButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },

  // Common Styles
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  discountText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});