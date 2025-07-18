import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, MapPin, Bell, Shield, CircleHelp as HelpCircle, Star, ChevronRight, Settings, LogOut, CreditCard as Edit, Heart, Clock, Bookmark } from 'lucide-react-native';

interface ProfileSection {
  id: string;
  title: string;
  items: Array<{
    id: string;
    label: string;
    icon: any;
    value?: string;
    hasSwitch?: boolean;
    switchValue?: boolean;
    onPress?: () => void;
  }>;
}

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            console.log('User logged out');
          },
        },
      ]
    );
  };

  const profileSections: ProfileSection[] = [
    {
      id: 'account',
      title: 'Account Settings',
      items: [
        {
          id: 'personal-info',
          label: 'Personal Information',
          icon: User,
          onPress: () => console.log('Personal info'),
        },
        {
          id: 'addresses',
          label: 'Saved Addresses',
          icon: MapPin,
          value: '3 locations',
          onPress: () => console.log('Addresses'),
        },
        {
          id: 'favorites',
          label: 'Favorite Products',
          icon: Heart,
          value: '12 items',
          onPress: () => console.log('Favorites'),
        },
        {
          id: 'saved-shops',
          label: 'Saved Shops',
          icon: Bookmark,
          value: '5 shops',
          onPress: () => console.log('Saved shops'),
        },
      ],
    },
    {
      id: 'preferences',
      title: 'App Preferences',
      items: [
        {
          id: 'notifications',
          label: 'Push Notifications',
          icon: Bell,
          hasSwitch: true,
          switchValue: notificationsEnabled,
          onPress: () => setNotificationsEnabled(!notificationsEnabled),
        },
        {
          id: 'location',
          label: 'Location Services',
          icon: MapPin,
          hasSwitch: true,
          switchValue: locationEnabled,
          onPress: () => setLocationEnabled(!locationEnabled),
        },
        {
          id: 'privacy',
          label: 'Privacy & Security',
          icon: Shield,
          onPress: () => console.log('Privacy'),
        },
      ],
    },
    {
      id: 'activity',
      title: 'Activity & History',
      items: [
        {
          id: 'search-history',
          label: 'Search History',
          icon: Clock,
          onPress: () => console.log('Search history'),
        },
        {
          id: 'viewed-products',
          label: 'Recently Viewed',
          icon: Star,
          value: '24 products',
          onPress: () => console.log('Recently viewed'),
        },
      ],
    },
    {
      id: 'support',
      title: 'Support & Help',
      items: [
        {
          id: 'help',
          label: 'Help Center',
          icon: HelpCircle,
          onPress: () => console.log('Help'),
        },
        {
          id: 'settings',
          label: 'App Settings',
          icon: Settings,
          onPress: () => console.log('Settings'),
        },
      ],
    },
  ];

  const renderSectionItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.sectionItem}
      onPress={item.onPress}
    >
      <View style={styles.itemLeft}>
        <View style={styles.itemIcon}>
          <item.icon size={20} color="#6B7280" />
        </View>
        <Text style={styles.itemLabel}>{item.label}</Text>
      </View>
      <View style={styles.itemRight}>
        {item.hasSwitch ? (
          <Switch
            value={item.switchValue}
            onValueChange={() => item.onPress()}
            trackColor={{ false: '#D1D5DB', true: '#FFA500' }}
            thumbColor={item.switchValue ? '#FFFFFF' : '#FFFFFF'}
          />
        ) : (
          <>
            {item.value && (
              <Text style={styles.itemValue}>{item.value}</Text>
            )}
            <ChevronRight size={16} color="#D1D5DB" />
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Edit size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userContainer}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.avatar}
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Sarah Johnson</Text>
              <Text style={styles.userEmail}>sarah.johnson@email.com</Text>
              <Text style={styles.userLocation}>📍 Downtown, City Center</Text>
            </View>
          </View>
          
          <View style={styles.userStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Products Found</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Saved Shops</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          </View>
        </View>

        {/* Sections */}
        {profileSections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map(renderSectionItem)}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>GroceryFinder v1.0.0</Text>
          <Text style={styles.versionSubtext}>Phase 1 - Product Discovery</Text>
        </View>
      </ScrollView>
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
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  userLocation: {
    fontSize: 14,
    color: '#6B7280',
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemLabel: {
    fontSize: 16,
    color: '#000000',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  logoutContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 12,
    fontWeight: '500',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  versionSubtext: {
    fontSize: 10,
    color: '#D1D5DB',
  },
});