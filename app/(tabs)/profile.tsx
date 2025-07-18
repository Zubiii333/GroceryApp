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
import { User, MapPin, CreditCard, Bell, Shield, CircleHelp as HelpCircle, Star, Gift, ChevronRight, Settings, LogOut, CreditCard as Edit } from 'lucide-react-native';

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
            // Handle logout logic
            console.log('User logged out');
          },
        },
      ]
    );
  };

  const profileSections: ProfileSection[] = [
    {
      id: 'account',
      title: 'Account',
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
          value: '2 addresses',
          onPress: () => console.log('Addresses'),
        },
        {
          id: 'payment',
          label: 'Payment Methods',
          icon: CreditCard,
          value: '2 cards',
          onPress: () => console.log('Payment'),
        },
      ],
    },
    {
      id: 'preferences',
      title: 'Preferences',
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
      id: 'rewards',
      title: 'Rewards & Benefits',
      items: [
        {
          id: 'loyalty',
          label: 'Loyalty Points',
          icon: Star,
          value: '1,250 points',
          onPress: () => console.log('Loyalty'),
        },
        {
          id: 'referral',
          label: 'Refer Friends',
          icon: Gift,
          value: 'Earn $5',
          onPress: () => console.log('Referral'),
        },
      ],
    },
    {
      id: 'support',
      title: 'Support',
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
            trackColor={{ false: '#D1D5DB', true: '#10B981' }}
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userContainer}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.avatar}
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userEmail}>john.doe@email.com</Text>
              <View style={styles.userStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>24</Text>
                  <Text style={styles.statLabel}>Orders</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>4.8</Text>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>1,250</Text>
                  <Text style={styles.statLabel}>Points</Text>
                </View>
              </View>
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
          <Text style={styles.versionText}>GroceryApp v1.0.0</Text>
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
    color: '#1F2937',
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
    paddingBottom: 20,
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
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
    color: '#1F2937',
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
  },
});