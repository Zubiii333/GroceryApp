import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { MapPin, Navigation } from 'lucide-react-native';

interface LocationServiceProps {
  onLocationUpdate?: (location: Location.LocationObject) => void;
  onAddressUpdate?: (address: string) => void;
}

export default function LocationService({ onLocationUpdate, onAddressUpdate }: LocationServiceProps) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setPermissionGranted(status === 'granted');
    if (status === 'granted') {
      getCurrentLocation();
    }
  };

  const requestPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionGranted(status === 'granted');
      
      if (status === 'granted') {
        getCurrentLocation();
      } else {
        Alert.alert(
          'Location Permission Required',
          'This app needs location access to show nearby grocery stores and delivery options.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => console.log('Open settings') },
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      setLocation(currentLocation);
      onLocationUpdate?.(currentLocation);

      // Get address from coordinates
      const addressResult = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (addressResult[0]) {
        const formattedAddress = formatAddress(addressResult[0]);
        setAddress(formattedAddress);
        onAddressUpdate?.(formattedAddress);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert(
        'Location Error',
        'Unable to get your current location. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
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

  if (!permissionGranted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <MapPin size={48} color="#10B981" />
          <Text style={styles.permissionTitle}>Location Access Required</Text>
          <Text style={styles.permissionDescription}>
            We need access to your location to show nearby grocery stores and provide accurate delivery estimates.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Enable Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.locationContainer}>
      <View style={styles.locationInfo}>
        <MapPin size={16} color="#6B7280" />
        <Text style={styles.locationText} numberOfLines={1}>
          {address || 'Getting location...'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.updateButton}
        onPress={getCurrentLocation}
        disabled={loading}
      >
        <Navigation size={16} color="#10B981" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionContainer: {
    alignItems: 'center',
    maxWidth: 300,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  permissionDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },
  updateButton: {
    padding: 4,
  },
});