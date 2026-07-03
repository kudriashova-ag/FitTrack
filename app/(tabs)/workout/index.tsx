import AddWorkoutModal from '@/src/components/addWorkoutModal';
import WorkoutCard from '@/src/components/WorkoutCard';
import { COLORS } from '@/src/constants/theme';
import { useWorkouts } from '@/src/hooks/useWorkouts';
import { useUIStore } from '@/src/store/uiStore';
import { useWorkoutStore } from '@/src/store/workoutStore';
import type { Workout } from '@/src/types/workout';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  
  const { data: workouts, isLoading, isError } = useWorkouts();

    const router = useRouter();

    const handleWorkoutPress = (workout: Workout) => {
        router.push({ pathname: "/workout/[id]", params: { id: workout.id } });
    }
    // modal
    const isModalOpen = useUIStore(state => state.isAddWorkoutModalOpen);
    const closeModal = useUIStore(state => state.closeAddWorkoutModal);

    return (
      <View>
        <Text>Home {"\n"} gdfgdfgdfg</Text>

        {isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text>Loading...</Text>
          </View>
        ) : isError ? (
          <View style={styles.center}>
            <Text>Error</Text>
          </View>
        ) : (
          <FlatList
            data={workouts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <WorkoutCard workout={item} onPress={handleWorkoutPress} />
            )}
          />
        )}

        <AddWorkoutModal visible={isModalOpen} onClose={closeModal} />
      </View>
    );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HomeScreen;
