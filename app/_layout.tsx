import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from 'expo-router/drawer';
import DrawerContent from '@/src/components/DrawerContent';
import { runMigrations } from '@/src/db/migrations';
import { seedDatabase } from '@/src/db/seed';
import QueryProvider from '@/src/providers/QueryProvider';

const RootLayout = () => {

  useEffect(() => {
    const init = async () => {
      try {
        runMigrations()
        await seedDatabase()
      }
      catch (error) {
        console.error("DB init error:", error);
      }
    }

    init();
  }, []);


  return (
    <QueryProvider>
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
    </QueryProvider>
  );
}

const styles = StyleSheet.create({})

export default RootLayout;
