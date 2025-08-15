import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star, Plus, Clock, MapPin } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';

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
    unit: string;
    brand: string;
    productType: string[];
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
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    if (product.inStock) {
      if (quantity === 0) {
        addItem(product);
      } else {
        updateQuantity(product.id, quantity + 1);
      }
      onAddToCart?.();
    }
  };

  const handleQuantityDecrease = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const renderAddButton = (size: number, isGrid: boolean = true) => {
    if (!product.inStock) {
      return (
        <View style={[
          isGrid ? styles.gridAddButton : styles.listAddButton,
          isGrid ? styles.gridAddButtonDisabled : styles.listAddButtonDisabled
        ]}>
          <Plus size={size} color="#9CA3AF" />
        </View>
      );
    }

    if (quantity === 0) {
      return (
        <TouchableOpacity
          style={isGrid ? styles.gridAddButton : styles.listAddButton}
          onPress={handleAddToCart}
        >
          <Plus size={size} color="#FFFFFF" />
        </TouchableOpacity>
      );
    }

    return (
      <View style={isGrid ? styles.gridQuantityContainer : styles.listQuantityContainer}>
        <TouchableOpacity
          style={isGrid ? styles.gridQuantityButton : styles.listQuantityButton}
          onPress={handleQuantityDecrease}
        >
          <Text style={isGrid ? styles.gridQuantityButtonText : styles.listQuantityButtonText}>−</Text>
        </TouchableOpacity>
        <Text style={isGrid ? styles.gridQuantityText : styles.listQuantityText}>
          {quantity}
        </Text>
        <TouchableOpacity
          style={isGrid ? styles.gridQuantityButton : styles.listQuantityButton}
          onPress={handleAddToCart}
        >
          <Text style={isGrid ? styles.gridQuantityButtonText : styles.listQuantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };
  if (layout === 'list') {
    return (
      <TouchableOpacity style={styles.listCard} onPress={onPress}>
        <Image source={{ uri: product.image }} style={styles.listImage} />
        <View style={styles.listContent}>
          <Text style={styles.listProductName}>{product.name}</Text>
          <Text style={styles.listProductBrand}>{product.brand} • {product.unit}</Text>
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
        <Text style={styles.gridProductUnit}>{product.unit}</Text>
        
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
          {renderAddButton(14, true)}
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
  gridProductUnit: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 6,
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
  
  // Quantity control styles for grid
  gridQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    borderRadius: 14,
    paddingHorizontal: 4,
    paddingVertical: 2,
    minWidth: 70,
  },
  
  gridQuantityButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  gridQuantityButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 12,
  },
  
  gridQuantityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginHorizontal: 8,
    minWidth: 16,
    textAlign: 'center',
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
  listProductBrand: {
    fontSize: 12,
    color: '#9CA3AF',
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
  
  // Quantity control styles for list
  listQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 4,
    minWidth: 80,
  },
  
  listQuantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  listQuantityButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14,
  },
  
  listQuantityText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
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