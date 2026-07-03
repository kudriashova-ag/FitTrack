import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Modal, Text, Pressable, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWorkoutStore } from '../store/workoutStore';
import { useAddWorkout } from '../hooks/useWorkouts';
import { NewWorkout } from '../db/schema';

type Props = {
    visible: boolean,
    onClose: () => void
}

const AddWorkoutModal = ({ visible, onClose }: Props) => {

  const { mutate: addWorkout, isPending} = useAddWorkout();

  const handleClick = () => { 
    const newWorkout : NewWorkout = {
      id: Date.now().toString(),
      title: "Нове тренування",
      category: "strength",
      duration: 60,
      scheduledAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    addWorkout(
      { workout: newWorkout, exercises: [] },
      {
        onSuccess: () => {
          onClose();
         },
        onError: (error) => {
          console.log(error);
         }
      });


  }


    return (
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="fullScreen" // IOS
        onRequestClose={onClose}
        statusBarTranslucent
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Text>Modal</Text>
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={24} color="black" />
          </Pressable>

          <Button title="Add" onPress={handleClick} />
        </SafeAreaView>
      </Modal>
    );
}

const styles = StyleSheet.create({})

export default AddWorkoutModal;
