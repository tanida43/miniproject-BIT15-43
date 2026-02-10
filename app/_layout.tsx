import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000' } }}>
        <Stack.Screen name="(tabs)" />       
        <Stack.Screen 
          name="search" 
          options={{ 
            presentation: 'fullScreenModal',
            animation: 'slide_from_right' 
          }} 
        />
        <Stack.Screen 
          name="compose" 
          options={{ 
            presentation: 'modal', 
            animation: 'slide_from_bottom' 
          }} 
        />
      </Stack>
    </>
  );
}