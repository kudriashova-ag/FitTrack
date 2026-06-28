import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  SHADOW,
  SPACING,
} from "../constants/theme";
import type { Workout } from "../types/workout";

type Props = {
  workout: Workout;
  onPress: (workout: Workout) => void;
};

const SWIPE_THRESHOLD = 60; // скільки потрібно потягнути, щоб показати кнопку
const DELETE_WIDTH = 80; // ширина зони видалення

const WorkoutCard = ({ workout, onPress }: Props) => {
  const translateX = useSharedValue(0);
  const isOpen = useSharedValue(false);

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
    
    const deleteAnimatedStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
        translateX.value,
        [0, DELETE_WIDTH * 0.5, DELETE_WIDTH],
        [0, 0.5, 1],
      ),
      transform: [
        {
          scale: interpolate(translateX.value, [0, DELETE_WIDTH], [0.7, 1]),
        },
      ],
    }));

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onUpdate((event) => {
      if (!isOpen.value) {
        translateX.value = Math.max(0, Math.min(event.translationX, DELETE_WIDTH));
      } else {
        translateX.value = Math.max(0, Math.min(event.translationX + DELETE_WIDTH, DELETE_WIDTH));
      }
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withSpring(DELETE_WIDTH);
        isOpen.value = true;
      } else {
        translateX.value = withSpring(0);
        isOpen.value = false;
      }
    });

  return (
    <View>
      <Animated.View style={[styles.deleteAction, deleteAnimatedStyle]}>
        <Pressable style={styles.deleteBtn}>
          <Ionicons name="trash-outline" size={24} color="#fff" />
        </Pressable>
      </Animated.View>
      {/* Картка */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={cardAnimatedStyle}>
          <Pressable onPress={() => onPress(workout)} style={styles.card}>
            <View style={styles.body}>
              <Text style={styles.title}>{workout.title}</Text>
              <Text
                style={[
                  styles.badge,
                  { backgroundColor: COLORS[workout.category] },
                ]}
              >
                {workout.category}
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: "hidden",
    ...Platform.select({
      ios: { ...SHADOW.sm },
      android: { elevation: 2 },
    }),
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  accent: {
    width: 4,
    alignSelf: "stretch",
  },
  body: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.full,
  },
  badgeText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: "500",
  },
  metaRow: {
    flexDirection: "row",
    gap: SPACING.lg,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  arrow: {
    marginRight: SPACING.md,
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: COLORS.error,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS.lg,
  },
  deleteAction: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: SPACING.md,
    width: DELETE_WIDTH,
    borderRadius: BORDER_RADIUS.lg,
  },
});

export default WorkoutCard;
