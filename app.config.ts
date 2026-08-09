import { ConfigContext, ExpoConfig } from "@expo/config";

const APP_VARIANT = process.env.APP_VARIANT || "production"; // варіант збірки (development, preview, production)
const isDev = APP_VARIANT === "development";
const isPreview = APP_VARIANT === "preview";

const appName = isDev ? "Fit dev" : isPreview ? "Fit preview" : "Fit";
const bundleId = isDev
  ? "com.fit.dev"
  : isPreview
    ? "com.fit.preview"
    : "com.fit";

const EAS_PROJECT_ID = "96df61dd-9b10-43fd-b632-685e4f3688b3"; // реальний ID проекту EAS

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config, // app.json
  name: appName,
  slug: "FitTrack",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png", // iOS + Android запасний варіант
  scheme: "fittrack", // потрібно для deep linking та expo-updates
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: bundleId,
  },
  android: {
    package: bundleId,
    googleServicesFile: "./google-services.json",
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
    },
  },
  plugins: [
    [
      "expo-camera",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
        recordAudioAndroid: true,
        barcodeScannerEnabled: true,
      },
    ],
    [
      "expo-sensors",
      {
        motionPermission: "FitTrack рахує кроки",
      },
    ],
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
    "expo-sqlite",
    [
      "expo-notifications",
      {
        icon: "./assets/images/icon.png",
        color: "#ff3700",
      },
    ]
  ],
  extra: {
    router: {},
    eas: {
      projectId: EAS_PROJECT_ID,
    },
    apiUrl: process.env.API_URL || "https://api.fittrack.com", // URL API сервера бекенду
    variant: APP_VARIANT,
  },
  runtimeVersion: { policy: "fingerprint" },
  updates: {
    url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
  },
});
