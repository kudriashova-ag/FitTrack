import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from 'expo-router/drawer';
import DrawerContent from '@/src/components/DrawerContent';
import { runMigrations } from '@/src/db/migrations';
import { seedDatabase } from '@/src/db/seed';
import QueryProvider from '@/src/providers/QueryProvider';
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync(); // Prevents the splash screen from auto-hiding


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
      finally {
         SplashScreen.hideAsync(); // Hides the splash screen after initialization
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
