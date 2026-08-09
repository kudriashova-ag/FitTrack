import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

export const getNotificationPushToken = async () => {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (!Device.isDevice) {
    console.log("Потрібен фізичний пристрій для push notifications");
    return;
  }

  // можна запитати дозвіл на надсилання сповіщень ( з _layout.tsx)

  const projectId = Constants?.expoConfig?.extra?.eas?.projectId;

  if (!projectId) {
    console.log("Не знайдено projectId у конфігурації");
    return;
  }

  const token = (
    await Notifications.getExpoPushTokenAsync({
      projectId: projectId,
    })
  ).data;

  console.log("Expo Push Token", token);
  return token;
};