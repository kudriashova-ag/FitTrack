// =============================================================
// src/hooks/usePedometer.ts
// Тиждень 6 — рахувальник кроків через expo-sensors Pedometer
// =============================================================

import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Pedometer } from "expo-sensors";

type PedometerState = {
  isAvailable: boolean;
  isPermissionGranted: boolean;
  steps: number;
  error: string | null;
};

function usePedometer() {
  const [state, setState] = useState<PedometerState>({
    isAvailable: false,
    isPermissionGranted: false,
    steps: 0,
    error: null,
  });

  useEffect(() => {
    let subscription: ReturnType<typeof Pedometer.watchStepCount> | null = null;
    let isMounted = true;

    const setup = async () => {
      const available = await Pedometer.isAvailableAsync().catch(() => false);
      if (!isMounted) return;

      if (!available) {
        setState((prev) => ({
          ...prev,
          isAvailable: false,
          error: "Крокомір недоступний на цьому пристрої",
        }));
        return;
      }

      const { status } =
        Platform.OS === "android"
          ? await Pedometer.requestPermissionsAsync()
          : { status: "granted" as const };

      if (!isMounted) return;

      if (status !== "granted") {
        setState((prev) => ({
          ...prev,
          isAvailable: true,
          isPermissionGranted: false,
          error: "Немає дозволу на використання крокоміра",
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        isAvailable: true,
        isPermissionGranted: true,
        error: null,
      }));

      // getStepCountAsync за діапазон дат підтримується лише на iOS
      let todayCount: { steps: number } | null = null;
      if (Platform.OS === "ios") {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        todayCount = await Pedometer.getStepCountAsync(start, new Date()).catch(
          () => null,
        );
        if (isMounted && todayCount) {
          setState((prev) => ({ ...prev, steps: todayCount!.steps }));
        }
      }

      subscription = Pedometer.watchStepCount((result) => {
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            steps: (todayCount?.steps ?? 0) + result.steps,
          }));
        }
      });
    };

    setup();

    return () => {
      isMounted = false;
      subscription?.remove();
    };
  }, []);

  return state;
}


export default usePedometer