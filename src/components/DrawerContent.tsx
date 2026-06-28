import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACING } from '../constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Href, usePathname, useRouter } from 'expo-router';

type NavItem = {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconActive: keyof typeof Ionicons.glyphMap;
    href: string
}

const NAV_ITEMS: NavItem[] = [
    { label: 'Тренування', icon: 'barbell-outline',     iconActive: 'barbell',     href: '/workout'  },
    { label: 'Прогрес',    icon: 'trending-up-outline', iconActive: 'trending-up', href: '/progress'  },
    { label: 'Профіль',    icon: 'person-outline',      iconActive: 'person',      href: '/profile'   },
    { label: 'Налаштування', icon: 'settings-outline',  iconActive: 'settings',    href: '/settings'  },
]


const DrawerContent = (props: DrawerContentComponentProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const navigate = (href: string) => {
        router.push(href as Href)
        props.navigation.closeDrawer()
    }

    return (
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={[styles.container, { paddingTop: 20 }]}
      >
        {/* Профіль користувача */}
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>FT</Text>
          </View>
          <Text style={styles.name}>FitTrack User</Text>
          <Text style={styles.email}>fittrack@example.com</Text>
        </View>

        {/* Розділювач */}
        <View style={styles.divider} />

        <View style={styles.nav}>
          {/* Навігація */}
          {NAV_ITEMS.map((item) => {
            const isActive =
              (pathname === "/" && item.href === "/workout") ||
              pathname === item.href;
            return (
              <Pressable
                key={item.href}
                onPress={() => navigate(item.href)}
                style={[styles.navItem, isActive && styles.navItemActive]}
              >
                <Ionicons
                  name={isActive ? item.iconActive : item.icon}
                  size={20}
                  color={isActive ? COLORS.primary : COLORS.textSecondary}
                />
                <Text
                  style={[styles.navLabel, isActive && styles.navLabelActive]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  profile: {
    padding: SPACING.xl,
    paddingTop: SPACING.lg,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary + "20",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  avatarText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
    color: COLORS.primary,
  },
  name: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  email: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 0.5,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  nav: {
    paddingHorizontal: SPACING.md,
    gap: 2,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  navItemActive: {
    backgroundColor: COLORS.primary + "12",
  },
  navLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  navLabelActive: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  version: {
    textAlign: "center",
    fontSize: FONT_SIZE.xs,
    color: COLORS.textTertiary,
    marginTop: "auto",
    paddingTop: SPACING.xl,
  },
});


export default DrawerContent;
