import React, {  useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';






const ProfileScreen = () => {
    const [done, setDone] = useState(false); // стан для відстеження, чи було виконано тренування

    const schedule = async () => { 
        if (done) {
            Alert.alert('Ви вже виконали тренування сьогодні');
            return;
        }

        await Notifications.scheduleNotificationAsync({
          identifier: "workout",
          content: {
            title: "Тренування",
            body: "Час для тренування!",
            data: { workoutId: 123 },
          },
          trigger: {
            type: SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 20, // через 20 секунд
            channelId: "workout-channel",
          },
        });

        Alert.alert('Сповіщення заплановано через 20 секунд');
    }

    const markDone = async () => {
        setDone(true);
        Alert.alert('Ви виконали тренування сьогодні, сповіщення більше не буде надсилатися');
        await Notifications.cancelScheduledNotificationAsync("workout");
    }


    return (
        <View>
            <Text>{done ? 'Зроблено' : 'Не зроблено'}</Text>
            <Button title="Запланувати сповіщення" onPress={schedule} />
            <Button title="Позначити як зроблено" onPress={markDone} />
        </View>
    );
}

const styles = StyleSheet.create({})

export default ProfileScreen;
