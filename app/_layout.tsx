import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Stack>
        {/* หน้าหลักคือ Tabs (ซ่อน Header ของ Stack ทิ้ง เพราะเราจะสร้างเองใน Tabs) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* หน้า Search แยกออกมา (ซ่อน Header เพื่อสร้างเอง และใส่ Animation) */}
        <Stack.Screen 
          name="search" 
          options={{ 
            headerShown: false, 
            presentation: 'fullScreenModal',
            animation: 'slide_from_right' 
          }} 
        />
      </Stack>
    </>
  );
}