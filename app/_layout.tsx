import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from 'expo-router/drawer';
import DrawerContent from '@/src/components/DrawerContent';

const RootLayout = () => {
    return (
      <GestureHandlerRootView>
        <Drawer
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            drawerType: "front",
            headerShown: false,
            swipeEdgeWidth: 100,
          }}
        >
          <Drawer.Screen name="(tabs)" />
          <Drawer.Screen name="settings" />
        </Drawer>
      </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({})

export default RootLayout;
