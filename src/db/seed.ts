import { MOCK_WORKOUTS } from "../constants/mockData";
import { db } from "./client";
import { exercises, workouts } from "./schema";

export const seedDatabase = async () => {
  const existing = db.select().from(workouts).get();
  if (existing) {
    console.log("DB alreary seeding");
    return;
  }

  console.log("Seeding...");

  await db.transaction(async (tx) => {
    for (const workout of MOCK_WORKOUTS) {
      await tx.insert(workouts).values({
        id: workout.id,
        title: workout.title,
        category: workout.category,
        duration: workout.duration,
        scheduledAt: workout.scheduledAt,
        completedAt: workout.completedAt ?? null,
        notes: workout.notes ?? null,
        createdAt: new Date().toISOString(),
      });

      if (workout.exercises.length > 0) {
        await tx.insert(exercises).values(
          workout.exercises.map((ex, index) => ({
            id: ex.id,
            workoutId: workout.id,
            name: ex.name,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight ?? null,
            durationSec: ex.durationSec ?? null,
            orderIndex: index,
          })),
        );
      }
    }
  });

  console.log("End Seeding...");
};
