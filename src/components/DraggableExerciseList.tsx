import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  SHADOW,
  SPACING,
} from "../constants/theme";
import { Exercise } from "../types/workout";
import { scheduleOnRN } from "react-native-worklets";

type Props = {
  exercises: Exercise[];
  accentColor: string;
  onReorder: (exercises: Exercise[]) => void;
};

type DraggableRowProps = {
  exercise: Exercise;
  index: number;
  count: number;
  accentColor: string;
  exersises: Exercise[],
  onReorder: (exercises: Exercise[]) => void
};

// весь список
const DraggableExerciseList = ({
  exercises,
  accentColor,
  onReorder,
}: Props) => {
  return (
    <View>
      {exercises.map((exercise, index) => (
        <DraggableRow
          key={exercise.id}
          index={index}
          exercise={exercise}
          count={exercises.length}
          accentColor={accentColor}
          exersises={exercises}
          onReorder={onReorder}
        />
      ))}
    </View>
  );
};

const ROW_HEIGHT = 75;






// одна вправа
const DraggableRow = ({
  exercise,
  index,
  count,
  accentColor,
  exersises,
  onReorder
}: DraggableRowProps) => {
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const reoderWorkouts = (newIndex: number, oldIndex: number) => {
    const result = [...exersises];
    const [moved] = result.splice(oldIndex, 1);
    result.splice(newIndex, 0, moved);
    onReorder(result);
  }

  const pan = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
    })
    .onUpdate((e) => {
      const minY = -index * ROW_HEIGHT; 
      const maxY = (count - 1 - index) * ROW_HEIGHT; 
      translateY.value = Math.max(minY, Math.min(maxY, e.translationY));
    })
    .onEnd(() => {
      
      const newIndex = index + Math.round(translateY.value / ROW_HEIGHT);
      isDragging.value = false;
      translateY.value = 0;
      if (newIndex !== index) { 
        scheduleOnRN(reoderWorkouts, newIndex, index);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    zIndex: isDragging.value ? 10 : 0,
    shadowOpacity: isDragging.value ? 0.1 : 0.5,
    opacity: isDragging.value ? 0.9 : 1,
  }));

  return (
    <Animated.View style={[styles.exerciseRow, animatedStyle]}>
      <GestureDetector gesture={pan}>
        <Animated.View style={{}}>
          <Ionicons
            name="reorder-three-outline"
            size={22}
            color={COLORS.textPrimary}
          />
        </Animated.View>
      </GestureDetector>
      <View style={[styles.num, { backgroundColor: accentColor + "15" }]}>
        <Text style={[styles.numText, { color: accentColor }]}>
          {index + 1}
        </Text>
      </View>
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.exerciseMeta}>
          {exercise.sets} × {exercise.reps}
          {exercise.weight ? ` · ${exercise.weight} кг` : ""}
          {exercise.durationSec ? ` · ${exercise.durationSec} с` : ""}
        </Text>
      </View>
      <Ionicons name="ellipse-outline" size={22} color={COLORS.border} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    gap: SPACING.md,
    ...SHADOW.sm,
  },
  num: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  numText: { fontSize: FONT_SIZE.sm, fontWeight: "700" },
  exerciseInfo: { flex: 1, gap: 3 },
  exerciseName: {
    fontSize: FONT_SIZE.md,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },
  exerciseMeta: { fontSize: FONT_SIZE.xs, color: COLORS.textSecondary },
});

export default DraggableExerciseList;
