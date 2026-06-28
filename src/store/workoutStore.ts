import { create } from "zustand";
import { Workout, WorkoutCategory } from "../types/workout";
import { storage } from "./storage";
import { MOCK_WORKOUTS } from "../constants/mockData";
import { createJSONStorage, persist } from "zustand/middleware";

type WorkoutStore = {
    workouts: Workout[],
    activeFilter: WorkoutCategory | 'all',

    // дії
    addWorkout: (workout: Workout) => void,
    deleteWorkout: (id: string) => void,
    updateWorkout: (id: string, workout: Workout) => void,
    setFilter: (filter: WorkoutCategory | 'all') => void,
    completeWorkout: (id: string) => void
}


export const useWorkoutStore = create<WorkoutStore>()(
    persist(
        (set, get) => ({
                workouts: MOCK_WORKOUTS,
                activeFilter: 'all',
                
                // дії
                addWorkout: (workout) => { 
                    set(state => ({
                        workouts: [...state.workouts, workout]
                    }))
                },
                deleteWorkout: (id) => { },
                updateWorkout: (id, workout) => {},
                setFilter: (filter) => {},
                completeWorkout: (id) => {}
        }),
        // конфігурація  persist
        {
            name: "workout-store", // сключ в AsyncStorage
            storage: createJSONStorage(() => storage),
            partialize: (state) => ({ workouts: state.workouts }), // partialize - збереження частини стану
        }
    ),
);