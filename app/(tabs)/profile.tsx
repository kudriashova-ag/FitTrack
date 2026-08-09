import React, {  useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});



const ProfileScreen = () => {
    const [done, setDone] = useState(false); // стан для відстеження, чи було виконано тренування

    useEffect(() => { 
        const permissionNotification = async () => { 
            const { granted } = await Notifications.requestPermissionsAsync();
            if (!granted) {
                Alert.alert('Немає дозвлу на надсилання сповіщень');
                return;
            }
        }
        permissionNotification();
    }, [])

    // слухач для отримання сповіщень
    useEffect(() => { 
        const subscription = Notifications.addNotificationResponseReceivedListener((res) => { 
            const data = res.notification.request.content.data;
            Alert.alert('Отримано сповіщення', JSON.stringify(data))
        });
        return () => subscription.remove();
    }, [])

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
