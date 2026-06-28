import { MOCK_WORKOUTS } from '@/src/constants/mockData';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const WorkoutDetailScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const workout = MOCK_WORKOUTS.find(workout => workout.id === id);

    return (
        <View>
            <Text>{workout?.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default WorkoutDetailScreen;
