"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Home, User, Store, ShoppingCart, Package } from "lucide-react-native"
import { useRouter, usePathname } from "expo-router"
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing
} from 'react-native-reanimated'
import { navigationStyles, ANIMATION_CONFIG, COLORS } from '../constants/navigation-styles'

interface NavItem {
  id: string
  icon: React.ComponentType<{ size?: number; color?: string }>
  label: string
}

const navItems: NavItem[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "shops", icon: Store, label: "Shops" },
  { id: "cart", icon: ShoppingCart, label: "Cart" },
  { id: "orders", icon: Package, label: "Orders" },
  { id: "profile", icon: User, label: "Profile" },
]

export default function CleanNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  
  // Determine active index based on current route
  const getActiveIndex = () => {
    if (pathname === '/(tabs)/' || pathname === '/(tabs)/index') return 0
    if (pathname === '/(tabs)/shops') return 1
    if (pathname === '/(tabs)/cart') return 2
    if (pathname === '/(tabs)/orders') return 3
    if (pathname === '/(tabs)/profile') return 4
    return 0
  }
  
  const [activeIndex, setActiveIndex] = useState(getActiveIndex())

  // Animated values
  const indicatorTranslateX = useSharedValue(activeIndex * 70)

  const handleItemClick = (index: number) => {
    setActiveIndex(index)
    indicatorTranslateX.value = withTiming(index * 70, {
      duration: ANIMATION_CONFIG.duration,
      easing: Easing.out(Easing.quad),
    })
    
    // Navigate to the appropriate route
    const routes = ['/(tabs)/', '/(tabs)/shops', '/(tabs)/cart', '/(tabs)/orders', '/(tabs)/profile']
    router.push(routes[index] as any)
  }

  // Animated style for indicator
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorTranslateX.value }],
  }))

  return (
    <View style={navigationStyles.navigation}>
      <View style={navigationStyles.ul}>
        {navItems.map((item, index) => {
          const IconComponent = item.icon
          const isActive = activeIndex === index

          // Create animated styles for each tab
          const iconStyle = useAnimatedStyle(() => ({
            transform: [{ 
              translateY: withTiming(isActive ? -32 : 0, {
                duration: ANIMATION_CONFIG.duration,
                easing: Easing.out(Easing.quad),
              })
            }],
          }))

          const textStyle = useAnimatedStyle(() => ({
            opacity: withTiming(isActive ? 1 : 0, {
              duration: ANIMATION_CONFIG.duration,
              easing: Easing.out(Easing.quad),
            }),
            transform: [{ 
              translateY: withTiming(isActive ? 10 : 20, {
                duration: ANIMATION_CONFIG.duration,
                easing: Easing.out(Easing.quad),
              })
            }],
          }))

          return (
            <TouchableOpacity
              key={item.id}
              style={navigationStyles.li}
              onPress={() => handleItemClick(index)}
              activeOpacity={1}
            >
              <View style={navigationStyles.a}>
                <Animated.View style={[navigationStyles.icon, iconStyle]}>
                  <IconComponent size={24} color={COLORS.clr} />
                </Animated.View>
                <Animated.Text style={[navigationStyles.text, textStyle]}>
                  {item.label}
                </Animated.Text>
              </View>
            </TouchableOpacity>
          )
        })}
        
        {/* Indicator */}
        <Animated.View style={[navigationStyles.indicator, indicatorStyle]} />
      </View>
    </View>
  )
}

 