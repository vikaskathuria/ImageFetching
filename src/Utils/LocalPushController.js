import PushNotification from 'react-native-push-notification'

export const LocalNotification = (url) => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText:
      'Ready to Publish',
    subText: 'Local Notification Demo',
    title: 'Ready to Publish',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]'
  })
  PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      console.log('LOCAL NOTIFICATION123 ==>', notification,"item")
    },
  
    popInitialNotification: true,
    requestPermissions: true
  })
  
}

