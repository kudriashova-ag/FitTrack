// =============================================================
// src/constants/mockData.ts
// Тимчасові дані — замінимо SQLite на тижні 5–6
// =============================================================

import type { Workout } from "../types/workout";

export const MOCK_WORKOUTS: Workout[] = [
  {
    id: "1",
    title: "Тестове тренування A",
    category: "strength",
    duration: 60,
    scheduledAt: "2025-01-20T09:00:00",
    exercises: [
      { id: "e1", name: "Присідання зі штангою", sets: 4, reps: 8, weight: 80, orderIndex: 1 },
      { id: "e2", name: "Жим лежачи", sets: 4, reps: 8, weight: 70, orderIndex: 0 },
      { id: "e3", name: "Тяга штанги в нахилі", sets: 3, reps: 10, weight: 60, orderIndex: 2 },
      { id: "e4", name: "Жим штанги стоячи", sets: 3, reps: 10, weight: 40, orderIndex: 3 },
    ],
  },
  {
    id: "2",
    title: "Кардіо HIIT",
    category: "cardio",
    duration: 30,
    scheduledAt: "2025-01-21T07:00:00",
    exercises: [
      { id: "e5", name: "Бурпі", sets: 4, reps: 15, orderIndex: 0 },
      { id: "e6", name: "Скакалка", sets: 4, reps: 1, durationSec: 60, orderIndex: 1 },
      { id: "e7", name: "Гірський турист", sets: 4, reps: 20, orderIndex: 2 },
    ],
  },
  {
    id: "3",
    title: "Yoga & Розтяжка",
    category: "flexibility",
    duration: 45,
    scheduledAt: "2025-01-22T08:00:00",
    exercises: [
      {
        id: "e8",
        name: "Поза собаки мордою вниз",
        sets: 1,
        reps: 1,
        durationSec: 60, 
        orderIndex: 0
      },
      { id: "e9", name: "Pigeon pose", sets: 2, reps: 1, durationSec: 45, orderIndex: 1 },
      {
        id: "e10",
        name: "Розтяжка грудних",
        sets: 3,
        reps: 1,
        durationSec: 30,
        orderIndex: 2
      },
    ],
  },
  {
    id: "4",
    title: "Силове тренування B",
    category: "strength",
    duration: 55,
    scheduledAt: "2025-01-23T09:00:00",
    exercises: [
      { id: "e11", name: "Мертва тяга", sets: 4, reps: 6, weight: 100, orderIndex: 0 },
      { id: "e12", name: "Підтягування", sets: 4, reps: 8, orderIndex: 1 },
      {
        id: "e13",
        name: "Болгарські спліт-присідання",
        sets: 3,
        reps: 10,
        weight: 20,
        orderIndex: 2
      },
    ],
  }
];
