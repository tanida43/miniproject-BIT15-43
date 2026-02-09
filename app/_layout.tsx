import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000' } }}>
        {/* หน้าหลัก (Tabs) */}
        <Stack.Screen name="(tabs)" />
        
        {/* หน้า Search (เต็มจอ) */}
        <Stack.Screen 
          name="search" 
          options={{ 
            presentation: 'fullScreenModal',
            animation: 'slide_from_right' 
          }} 
        />

        {/* หน้า Compose (หน้าโพสต์/แก้ไข) เด้งขึ้นแบบ Modal */}
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