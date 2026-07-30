
import usePedometer from "@/src/hooks/usePedometer";
import { StyleSheet, Text, View } from "react-native";

export default function ProgressScreen() {
    const { isAvailable, isPermissionGranted, steps, error } = usePedometer();
  
  return (
    <View style={styles.container}>
      {!isAvailable && (
        <Text >
          {error ?? "Перевірка доступності крокоміра..."}
        </Text>
      )}
      {isAvailable && !isPermissionGranted && (
        <Text>{error}</Text>
      )}

      <Text>{steps} кроків</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
