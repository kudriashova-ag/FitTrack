import AddWorkoutModal from '@/src/components/addWorkoutModal';
import WorkoutCard from '@/src/components/WorkoutCard';
import { useUIStore } from '@/src/store/uiStore';
import { useWorkoutStore } from '@/src/store/workoutStore';
import type { Workout } from '@/src/types/workout';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
    const { workouts } = useWorkoutStore();

    const router = useRouter();

    const handleWorkoutPress = (workout: Workout) => {
        router.push({ pathname: "/workout/[id]", params: { id: workout.id } });
    }
    // modal
    const isModalOpen = useUIStore(state => state.isAddWorkoutModalOpen);
    const closeModal = useUIStore(state => state.closeAddWorkoutModal);

    return (
      <View>
        <Text>Home</Text>

        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WorkoutCard workout={item} onPress={handleWorkoutPress} />
          )}
        />

        <AddWorkoutModal visible={isModalOpen} onClose={closeModal} />
      </View>
    );
}

const styles = StyleSheet.create({})

export default HomeScreen;
