import DrawerContent from "@/src/components/DrawerContent";
import { runMigrations } from "@/src/db/migrations";
import { seedDatabase } from "@/src/db/seed";
import { getNotificationPushToken } from "@/src/hooks/notifications/useNotification";
import QueryProvider from "@/src/providers/QueryProvider";
import * as Notifications from "expo-notifications";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import React, {  useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync(); // Prevents the splash screen from auto-hiding

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const RootLayout = () => {
  useEffect(() => {
    const init = async () => {
      try {
        runMigrations();
        await seedDatabase();
      } catch (error) {
        console.error("DB init error:", error);
      } finally {
        SplashScreen.hideAsync(); // Hides the splash screen after initialization
      }
    };

    init();
  }, []);

  // запит на дозвіл на надсилання сповіщень
  useEffect(() => {
    const permissionNotification = async () => {
      const { granted } = await Notifications.requestPermissionsAsync();
      if (!granted) {
        Alert.alert("Немає дозвлу на надсилання сповіщень");
        return;
      }
    };
    permissionNotification();
  }, []);

  // слухач для отримання сповіщень
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (res) => {
        const data = res.notification.request.content.data;
        Alert.alert("Отримано сповіщення", JSON.stringify(data));
      },
    );
    return () => subscription.remove();
  }, []);

  useEffect(() => { 

    getNotificationPushToken().then((token) => { 
      if (token) { 
        fetch("http://192.168.31.251:3000/api/register-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }).catch((error) => {
          console.error("Не вдалося надіслати токен:", error);
        });
      }
    })

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
};

const styles = StyleSheet.create({});

export default RootLayout;
