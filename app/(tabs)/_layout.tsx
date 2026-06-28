import { COLORS } from '@/src/constants/theme';
import { Tabs, useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerActions } from '@react-navigation/native';
import { useUIStore } from '@/src/store/uiStore';

const TabLayout = () => {
  const navigation = useNavigation();

  const openDrawer = () => { 
    navigation.dispatch(DrawerActions.openDrawer());
  }

  // modal
  const openAddWorkoutModal = useUIStore((state) => state.openAddWorkoutModal);



    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textTertiary,
          tabBarStyle: {
            backgroundColor: COLORS.surface,
            borderTopColor: COLORS.border,
            borderTopWidth: 0.5,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "500",
          },
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 17,
          },
          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen
          name="workout"
          options={{
            title: "Тренування",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "barbell" : "barbell-outline"}
                size={size}
                color={color}
              />
            ),
            headerLeft: () => (
              <Pressable
                onPress={openDrawer}
                hitSlop={8}
                style={{ marginLeft: 4 }}
              >
                <Ionicons name="menu" size={26} color={COLORS.textPrimary} />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable
                onPress={openAddWorkoutModal}
                hitSlop={8}
                style={{ marginRight: 4 }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={26}
                  color={COLORS.primary}
                />
              </Pressable>
            ),
          }}
        />

        <Tabs.Screen
          name="progress"
          options={{
            title: "Прогрес",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "trending-up" : "trending-up-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Профіль",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    );
}

const styles = StyleSheet.create({})

export default TabLayout;
